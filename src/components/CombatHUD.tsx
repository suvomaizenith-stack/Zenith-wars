import type { Character } from "../data/characters";

interface CombatHUDProps {
  player: Character;
  opponent: Character;
  onExit: () => void;
}

function HealthBar({
  character,
  side,
}: {
  character: Character;
  side: "left" | "right";
}) {
  return (
    <div className={`health-panel ${side}`}>
      <div className="health-name">
        <span>{character.name}</span>
        {character.isBoss && <small>FINAL BOSS</small>}
      </div>

      <div className="health-track">
        <div
          className="health-fill"
          style={{
            width: `${character.health}%`,
            background: `linear-gradient(90deg, ${character.color}, ${character.accent})`,
          }}
        />
      </div>

      <div className="health-number">{character.health} HP</div>
    </div>
  );
}

export default function CombatHUD({
  player,
  opponent,
  onExit,
}: CombatHUDProps) {
  return (
    <div className="combat-hud">
      <div className="combat-topbar">
        <HealthBar character={player} side="left" />

        <div className="round-info">
          <span>ROUND</span>
          <strong>01</strong>
          <small>READY</small>
        </div>

        <HealthBar character={opponent} side="right" />
      </div>

      <div className="combat-bottom">
        <div className="combat-controls">
          <span>MOVE: A / D</span>
          <span>JUMP: SPACE</span>
          <span>PUNCH: J</span>
          <span>KICK: K</span>
          <span>BLOCK: L</span>
        </div>

        <button className="secondary-button" onClick={onExit}>
          EXIT MATCH
        </button>
      </div>
    </div>
  );
}