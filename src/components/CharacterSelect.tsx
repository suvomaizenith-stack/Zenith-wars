import { useState, type CSSProperties } from "react";
import { Canvas } from "@react-three/fiber";
import Fighter from "./Fighter";
import { characters } from "../data/characters";

type Slot = "player" | "opponent";

interface Props {
  onBack: () => void;
  onConfirm: (playerId: string, opponentId: string) => void;
}

export default function CharacterSelect({
  onBack,
  onConfirm,
}: Props) {
  const [activeSlot, setActiveSlot] = useState<Slot>("player");
  const [playerId, setPlayerId] = useState("vivekanand");
  const [opponentId, setOpponentId] = useState("anoop");

  const selectedId =
    activeSlot === "player" ? playerId : opponentId;

  const selected = characters.find(
    (character) => character.id === selectedId
  )!;

  const player = characters.find(
    (character) => character.id === playerId
  )!;

  const opponent = characters.find(
    (character) => character.id === opponentId
  )!;

  function chooseCharacter(id: string) {
    if (activeSlot === "player") {
      setPlayerId(id);
    } else {
      setOpponentId(id);
    }
  }

  function randomCharacter() {
    const available = characters.filter(
      (character) =>
        activeSlot === "opponent" || !character.isBoss
    );

    const random =
      available[Math.floor(Math.random() * available.length)];

    chooseCharacter(random.id);
  }

  const statRows = [
    ["HEALTH", selected.health],
    ["POWER", selected.power],
    ["SPEED", selected.speed],
  ] as const;

  return (
    <section className="character-screen">
      <header className="character-header">
        <button className="secondary-button" onClick={onBack}>
          ← BACK
        </button>

        <div className="character-heading">
          <span>THE ULTIMATE CAMPUS SHOWDOWN</span>
          <h1>CHOOSE YOUR FIGHTER</h1>
        </div>

        <div className="roster-count">10 FIGHTERS</div>
      </header>

      <div className="selection-layout">
        <div className="character-preview">
          <div
            className="preview-glow"
            style={{
              background: `radial-gradient(circle, ${selected.color}77, transparent 70%)`,
            }}
          />

          <Canvas camera={{ position: [0, 1.8, 5], fov: 38 }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 5, 4]} intensity={2} />
            <pointLight
              position={[-3, 2, 2]}
              intensity={15}
              color={selected.accent}
            />

            <Fighter
              position={[0, 0, 0]}
              color={selected.color}
              accent={selected.accent}
            />
          </Canvas>

          <div className="preview-info">
            <span>
              {selected.isBoss ? "FINAL BOSS" : "SELECTED FIGHTER"}
            </span>
            <h2>{selected.name}</h2>
            <p>{selected.title}</p>
          </div>

          <div className="stat-list">
            {statRows.map(([label, value]) => (
              <div className="stat-row" key={label}>
                <span>{label}</span>
                <div className="stat-track">
                  <div
                    className="stat-fill"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <b>{value}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="roster-panel">
          <div className="slot-switch">
            <button
              className={activeSlot === "player" ? "active" : ""}
              onClick={() => setActiveSlot("player")}
            >
              PLAYER 01
              <small>{player.name}</small>
            </button>

            <button
              className={activeSlot === "opponent" ? "active" : ""}
              onClick={() => setActiveSlot("opponent")}
            >
              OPPONENT
              <small>{opponent.name}</small>
            </button>
          </div>

          <div className="roster-grid">
            {characters.map((character) => {
              const isSelected = character.id === selectedId;
              const locked =
                activeSlot === "player" && character.isBoss;

              return (
                <button
                  key={character.id}
                  disabled={locked}
                  onClick={() => chooseCharacter(character.id)}
                  className={[
                    "fighter-card",
                    isSelected ? "selected" : "",
                    locked ? "locked" : "",
                  ].join(" ")}
                  style={
                    {
                      "--fighter-color": character.color,
                      "--fighter-accent": character.accent,
                    } as CSSProperties
                  }
                >
                  <div className="fighter-avatar">
                    <span>{character.name.charAt(0)}</span>
                    {character.isBoss && <small>BOSS</small>}
                  </div>

                  <strong>{character.name}</strong>
                  <small>{character.title}</small>
                </button>
              );
            })}
          </div>

          <div className="selection-actions">
            <button
              className="secondary-button"
              onClick={randomCharacter}
            >
              ↻ RANDOM FIGHTER
            </button>

            <button
              className="primary-button"
              onClick={() => onConfirm(playerId, opponentId)}
            >
              ENTER THE ARENA →
            </button>
          </div>

          <div className="matchup-preview">
            <span>YOUR MATCHUP</span>
            <strong>{player.name} VS {opponent.name}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}