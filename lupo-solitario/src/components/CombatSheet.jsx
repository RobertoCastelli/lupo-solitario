const CombatSheet = ({
  characterSheet,
  enemy,
  setEnemy,
  handleCombat,
  isCombatOver,
  combatResult,
  combatLog,
  modifiedPlayerCS,
  modifiers,
}) => {
  return (
    <>
      <section className="combattimento">
        <h3>combattimento</h3>
        <div className="combat-content">
          <ul className="lw-stats">
            <li>
              CS: {modifiedPlayerCS} (base: {characterSheet.cs} + mod:{" "}
              {modifiers})
            </li>
            <li>
              <div>EP: {characterSheet.ep}</div>
            </li>
          </ul>

          <div className="nemico-stats">
            <ul>
              <li>
                <label>CS: </label>
                <input
                  type="number"
                  placeholder="CS nemico"
                  value={enemy.cs}
                  onChange={(e) =>
                    setEnemy({ ...enemy, cs: Number(e.target.value) || 0 })
                  }
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
                />
              </li>
              <li>
                <div>Immune allo Psicolaser: </div>
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
              </li>
            </ul>
          </div>
        </div>
        <div className="btn-combatti">
          <button onClick={() => handleCombat()} disabled={isCombatOver}>
            Combatti
          </button>
        </div>
        <div className="combat-result">
          {combatResult && characterSheet.ep <= 0 && <p>💀 sei morto!</p>}
          {combatResult && enemy.ep <= 0 && <p>🏆 nemico sconfitto!</p>}
        </div>

        {combatResult && (
          <div className="combat-log">
            <ul>
              {combatLog.map((log, i) => (
                <li key={i} className="combat-log-entry">
                  <div className="combat-log-turno">
                    <strong>Turno {log.round}</strong>
                    <span className="dice">🎲 {log.roll}</span>
                  </div>

                  <div className="combat-log-cs">
                    <div>
                      <strong>LS</strong>
                      <br />
                      CS {log.playerCSBase}
                      {log.playerCSModifiers >= 0 ? " +" : " "}
                      {log.playerCSModifiers}
                      {" = "}
                      <strong>{log.playerCSTotal}</strong>
                    </div>

                    <div className="vs">⚔️</div>

                    <div>
                      <strong>Nemico</strong>
                      <br />
                      CS {log.enemyCS}
                    </div>
                  </div>

                  <div className="combat-log-ratio">
                    Rapporto di Forza:{" "}
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
                      EP Nemico: {log.enemyEPBefore} →{" "}
                      <strong>{log.enemyEPAfter}</strong>
                    </div>
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
