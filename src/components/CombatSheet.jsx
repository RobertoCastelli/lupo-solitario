import {
  GiBleedingWound,
  GiRaggedWound,
  GiSwordClash,
  GiDeathSkull,
  GiChewedSkull,
} from "react-icons/gi";

const CombatSheet = ({
  characterSheet,
  enemy,
  setEnemy,
  handleCombat,
  isCombatOver,
  combatResult,
  combatLog,
  weaponBonus,
  alterCS,
  setAlterCS,
  totalModifiers,
  playerCombatCS,
  psicolaser,
  scherma,
  unarmed,
}) => {
  return (
    <>
      <section className="combattimento">
        <h3>combattimento</h3>

        <div className="combat">
          <div className="btn-combatti">
            <button onClick={() => handleCombat()} disabled={isCombatOver}>
              Combatti
            </button>
          </div>

          <div className="lw-stats">
            <div>
              <label>CS: </label>
              {playerCombatCS + alterCS} ({characterSheet.cs}{" "}
              {totalModifiers + alterCS >= 0 ? " +" : " "}
              {totalModifiers + alterCS})
            </div>
            <div>
              <label>EP: </label>
              {characterSheet.ep} / {characterSheet.epMax}
            </div>
          </div>

          <div className="nemico-stats">
            <div>
              <label>CS: </label>
              <input
                type="number"
                value={enemy.cs}
                onChange={(e) =>
                  setEnemy({ ...enemy, cs: Number(e.target.value) || 0 })
                }
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div>
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
            </div>
          </div>

          <div className="combat-ratio">
            <div className="combat-ratio-icons">⚔️</div>
            <div className="combat-result-ratio">
              {playerCombatCS - enemy.cs + alterCS >= 0 ? "+" : ""}
              {playerCombatCS - enemy.cs + alterCS}
            </div>
            <div className="btn-group-change-value">
              <button onClick={() => setAlterCS((v) => v - 1)}>-</button>
              <button onClick={() => setAlterCS((v) => v + 1)}>+</button>
            </div>
          </div>

          <div className="combat-modifiers">
            <ul>
              {scherma !== 0 && <li>scherma: +2</li>}
              {psicolaser !== 0 && <li>psicolaser: +2</li>}
              {unarmed !== 0 && <li>disarmato: -4</li>}
              {weaponBonus !== 0 && (
                <li>
                  mod armi: {weaponBonus >= 0 ? "+" : ""}
                  {weaponBonus}
                </li>
              )}
              {alterCS !== 0 && (
                <li>
                  CS alterati: {alterCS >= 0 ? "+" : ""}
                  {alterCS}
                </li>
              )}
            </ul>
          </div>

          <div className="combat-psicolaser">
            <div>immune allo psicolaser: </div>
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
              <div className="combat-result-sconfitta">sei morto!</div>
            )}
            {combatResult && enemy.ep <= 0 && (
              <div className="combat-result-vittoria">nemico sconfitto!</div>
            )}
          </div>
        </div>

        {combatResult && (
          <div className="combat-log">
            <ul>
              {combatLog.map((log, i) => (
                <li key={i}>
                  <div>
                    {log.playerEPBefore} → <strong>{log.playerEPAfter}</strong>
                  </div>
                  <div>
                    {log.playerEPAfter === 0 ? (
                      <GiChewedSkull className="icon" color="brown" />
                    ) : log.playerEPAfter < log.playerEPBefore ? (
                      <GiRaggedWound className="icon" color="brown" />
                    ) : (
                      <GiSwordClash className="icon" color="cadetblue" />
                    )}
                    <span>{log.playerEPAfter - log.playerEPBefore}</span>{" "}
                  </div>

                  <div className="combat-log-turno">
                    <div>RN {log.round}</div>
                    <div>🎲 {log.roll}</div>
                  </div>

                  <div>
                    <span>{log.enemyEPAfter - log.enemyEPBefore}</span>{" "}
                    {log.enemyEPAfter === 0 ? (
                      <GiDeathSkull className="icon" color="brown" />
                    ) : log.enemyEPAfter < log.enemyEPBefore ? (
                      <GiBleedingWound className="icon" color="brown" />
                    ) : (
                      <GiSwordClash className="icon" color="cadetblue" />
                    )}
                  </div>
                  <div>
                    {log.enemyEPBefore} → <strong>{log.enemyEPAfter}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default CombatSheet;
