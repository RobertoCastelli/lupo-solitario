import {
  GiSwordwoman,
  GiWolfHead,
  GiMonsterGrasp,
  GiBleedingWound,
  GiBackstab,
  GiBullyMinion,
  GiRaggedWound,
  GiVampireDracula,
  GiOrcHead,
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
  modifiedPlayerCS,
  modifierPsicolaser,
  modifierScherma,
  modifierUnarmed,
}) => {
  return (
    <>
      <section className="combattimento">
        <h3>combattimento</h3>

        <div className="combat">
          <div className="lw-stats">
            <div>
              <GiWolfHead className="icon" size={20} />
              <br />
              <label>CS: </label>
              {modifiedPlayerCS} ({characterSheet.cs}{" "}
              {modifiedPlayerCS - characterSheet.cs >= 0 ? " +" : " "}
              {modifiedPlayerCS - characterSheet.cs})
            </div>
            <div>
              <label>EP: </label>
              {characterSheet.ep} / {characterSheet.epMax}
            </div>
          </div>

          <div className="nemico-stats">
            <div>
              <GiOrcHead className="icon" size={20} />
              <br />
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
              {modifiedPlayerCS - enemy.cs >= 0 ? "+" : ""}
              {modifiedPlayerCS - enemy.cs}
            </div>
          </div>

          <div className="combat-modifiers">
            <ul>
              {modifierScherma !== 0 && <li>Scherma: +2</li>}
              {modifierPsicolaser !== 0 && <li>Psicolaser: +2</li>}
              {modifierUnarmed !== 0 && <li>Disarmato: -4</li>}
            </ul>
          </div>

          {/*     <div className="ep-bar">
                <div
                  className="ep-fill enemy"
                  style={{
                    width: `${
                      enemy.ep > 0 && enemy.epMax
                        ? (enemy.ep / enemy.epMax) * 100
                        : 0
                    }%`,
                  }}
                />
              </div> */}

          {/*  <div className="ep-bar">
            <div
              className="ep-fill"
              style={{
                width: `${(characterSheet.ep / characterSheet.epMax) * 100}%`,
              }}
            />
          </div> */}

          <div className="btn-combatti">
            <button onClick={() => handleCombat()} disabled={isCombatOver}>
              Combatti
            </button>
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
              <p className="combat-result-sconfitta">sei morto!</p>
            )}
            {combatResult && enemy.ep <= 0 && (
              <p className="combat-result-vittoria">nemico sconfitto!</p>
            )}
          </div>

          {combatResult && (
            <div className="combat-log">
              <ul>
                {combatLog.map((log, i) => (
                  <li key={i} className="combat-log-entry">
                    <div className="combat-log-ep">
                      <div>
                        {log.playerEPAfter === 0 ? (
                          <GiChewedSkull className="icon" color="white" />
                        ) : log.playerEPAfter < log.playerEPBefore ? (
                          <GiRaggedWound className="icon" color="brown" />
                        ) : (
                          <GiSwordClash className="icon" color="cadetblue" />
                        )}
                        ({log.playerEPAfter - log.playerEPBefore}){" "}
                        {log.playerEPBefore} →{" "}
                        <strong>{log.playerEPAfter}</strong>
                      </div>

                      <div className="combat-log-turno">
                        <div>RN {log.round}</div>
                        <div>🎲 {log.roll}</div>
                      </div>

                      <div>
                        {log.enemyEPAfter === 0 ? (
                          <GiDeathSkull className="icon" color="white" />
                        ) : log.enemyEPAfter < log.enemyEPBefore ? (
                          <GiBleedingWound className="icon" color="brown" />
                        ) : (
                          <GiSwordClash className="icon" color="cadetblue" />
                        )}
                        ({log.enemyEPAfter - log.enemyEPBefore}){" "}
                        {log.enemyEPBefore} →{" "}
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
