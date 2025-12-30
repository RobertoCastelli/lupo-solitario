import { GiTrophy } from "react-icons/gi";
import { IoSkull } from "react-icons/io5";

const CombatSheet = ({
  characterSheet,
  enemy,
  setEnemy,
  handleCombat,
  isCombatOver,
  combatResult,
  combatLog,
  modifiedPlayerCS,
}) => {
  return (
    <>
      <section className="combattimento">
        <h3>combattimento</h3>
        <div className="combat">
          <div className="lw-stats">
            lupo solitario
            <ul>
              <li>
                <label>CS:</label>
                {modifiedPlayerCS} ({characterSheet.cs}{" "}
                {modifiedPlayerCS - characterSheet.cs >= 0 ? " +" : " "}
                {modifiedPlayerCS - characterSheet.cs})
              </li>
              <li>
                <label>EP:</label>
                {characterSheet.ep} / {characterSheet.epMax}
              </li>
            </ul>
          </div>

          <div className="nemico-stats">
            nemico
            <ul>
              <li>
                <label>CS: </label>
                <input
                  type="number"
                  value={enemy.cs}
                  onChange={(e) =>
                    setEnemy({ ...enemy, cs: Number(e.target.value) || 0 })
                  }
                  onFocus={(e) => e.target.select()}
                />
              </li>
              <li>
                <label>EP: </label>
                <input
                  type="number"
                  placeholder="EP nemico"
                  value={enemy.ep}
                  onChange={(e) =>
                    setEnemy({ ...enemy, ep: Number(e.target.value) || 0 })
                  }
                  onFocus={(e) => e.target.select()}
                />
              </li>
            </ul>
          </div>

          <div className="btn-combatti">
            <button onClick={() => handleCombat()} disabled={isCombatOver}>
              Combatti
            </button>
          </div>

          <div className="combat-psicolaser">
            <small>immune allo psicolaser: </small>
            <input
              type="checkbox"
              checked={enemy.immuneToPsicolaser}
              onChange={(e) =>
                setEnemy({
                  ...enemy,
                  immuneToPsicolaser: e.target.checked,
                })
              }
            />
          </div>

          <div className="combat-result">
            {combatResult && characterSheet.ep <= 0 && (
              <p>
                <IoSkull className="icon" size={20} /> sei morto!
              </p>
            )}
            {combatResult && enemy.ep <= 0 && (
              <p>
                <GiTrophy className="icon" size={20} /> nemico sconfitto!
              </p>
            )}
          </div>

          {combatResult && (
            <div className="combat-log">
              <ul>
                {combatLog.map((log, i) => (
                  <li key={i} className="combat-log-entry">
                    <div className="combat-log-turno">
                      <div>RN {log.round}</div>
                      <div>🎲 {log.roll}</div>
                    </div>

                    <div className="combat-log-cs">
                      <div>
                        <strong>LS</strong>
                        <br />
                        CS
                        <strong> {log.playerCSTotal}</strong>
                      </div>
                      <div>⚔️</div>

                      <div>
                        <strong>NE</strong>
                        <br />
                        CS <strong>{log.enemyCS}</strong>
                      </div>
                    </div>

                    <div className="combat-log-ratio">
                      RDF:{" "}
                      <strong>
                        {log.ratio >= 0 ? "+" : ""}
                        {log.ratio}
                      </strong>
                    </div>

                    <div className="combat-log-ep">
                      <div>
                        EP LS: {log.playerEPBefore} →{" "}
                        <strong>{log.playerEPAfter}</strong>
                      </div>

                      <div>
                        EP NE: {log.enemyEPBefore} →{" "}
                        <strong>{log.enemyEPAfter}</strong>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CombatSheet;
