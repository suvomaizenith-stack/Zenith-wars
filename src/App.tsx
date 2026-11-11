import { useState } from "react";
import MainArena from "./scenes/MatchArena";
import MatchArena from "./scenes/MatchArena";
import CharacterSelect from "./components/CharacterSelect";
import { characters } from "./data/characters";

type Screen =
  | "home"
  | "select"
  | "instructions"
  | "settings"
  | "match";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [music, setMusic] = useState(true);

  const [playerId, setPlayerId] = useState("vivekanand");
  const [opponentId, setOpponentId] = useState("anoop");

  const player = characters.find(
    (character) => character.id === playerId
  )!;

  const opponent = characters.find(
    (character) => character.id === opponentId
  )!;

  function startMatch(selectedPlayerId: string, selectedOpponentId: string) {
    setPlayerId(selectedPlayerId);
    setOpponentId(selectedOpponentId);
    setScreen("match");
  }

  return (
    <main className="app-shell">
      {screen === "home" && (
        <>
          <div className="arena-background">
            <MainArena />
          </div>

          <div className="vignette" />

          <header className="topbar">
            <div className="brand">
              <span className="brand-mark">Z</span>
              <div>
                <strong>ZENITH</strong>
                <small>WARS</small>
              </div>
            </div>

            <nav className="top-nav">
              <button onClick={() => setScreen("instructions")}>
                HOW TO PLAY
              </button>

              <button onClick={() => setScreen("settings")}>
                SETTINGS
              </button>
            </nav>
          </header>

          <section className="hero">
            <div className="hero-content">
              <div className="eyebrow">
                <span className="live-dot" />
                THE ULTIMATE CAMPUS SHOWDOWN
              </div>

              <h1>
                ZENITH
                <span>WARS</span>
              </h1>

              <p className="hero-description">
                One campus. Ten fighters. One ultimate showdown.
                <br />
                Enter the arena and settle the score.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => setScreen("select")}
                >
                  START FIGHT <span>→</span>
                </button>

                <button
                  className="secondary-button"
                  onClick={() => setScreen("select")}
                >
                  CHARACTER SELECT
                </button>
              </div>

              <div className="hero-footer">
                <span>ARCADE FIGHTING EXPERIENCE</span>
                <span>SEASON 01 · ZENITH CAMPUS</span>
              </div>
            </div>
          </section>

          <div className="corner-label">
            <span>01</span>
            <div />
            <span>10</span>
          </div>
        </>
      )}

      {screen === "select" && (
        <CharacterSelect
          onBack={() => setScreen("home")}
          onConfirm={startMatch}
        />
      )}

      {screen === "match" && (
        <MatchArena
          player={player}
          opponent={opponent}
          onExit={() => setScreen("select")}
        />
      )}

      {(screen === "instructions" || screen === "settings") && (
        <>
          <div className="arena-background">
            <MainArena />
          </div>

          <div className="vignette" />

          <div className="modal">
            <div className="modal-card">
              <button
                className="close-button"
                onClick={() => setScreen("home")}
              >
                ✕
              </button>

              {screen === "instructions" && (
                <>
                  <div className="eyebrow">FIGHTER TRAINING</div>
                  <h2>HOW TO PLAY</h2>

                  <div className="instruction-list">
                    <p><strong>MOVEMENT</strong><span>A / D or Arrow Keys</span></p>
                    <p><strong>JUMP</strong><span>W or SPACE</span></p>
                    <p><strong>PUNCH</strong><span>J</span></p>
                    <p><strong>KICK</strong><span>K</span></p>
                    <p><strong>BLOCK</strong><span>L</span></p>
                    <p><strong>PAUSE</strong><span>ESC</span></p>
                  </div>
                </>
              )}

              {screen === "settings" && (
                <>
                  <div className="eyebrow">GAME CONFIGURATION</div>
                  <h2>SETTINGS</h2>

                  <div className="settings-row">
                    <span>BACKGROUND MUSIC</span>
                    <button
                      className="secondary-button"
                      onClick={() => setMusic(!music)}
                    >
                      {music ? "ON" : "OFF"}
                    </button>
                  </div>

                  <p className="settings-note">
                    Audio playback will be connected in a future update.
                  </p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}