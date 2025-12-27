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
      <section>
        <h2>Combattimento</h2>
        <div>
          <label>
            personaggio CS: {modifiedPlayerCS} (base: {characterSheet.cs} + mod:{" "}
            {modifiers}) personaggio EP: {characterSheet.ep}
          </label>
          <label>
            Nemico CS:{" "}
            <input
              type="number"
              value={enemy.cs}
              onChange={(e) =>
                setEnemy({ ...enemy, cs: Number(e.target.value) || 0 })
              }
            />
          </label>
          <label>
            Nemico EP:{" "}
            <input
              type="number"
              value={enemy.ep}
              onChange={(e) =>
                setEnemy({ ...enemy, ep: Number(e.target.value) })
              }
            />
          </label>
          <label>
            Immune allo Psicolaser:{" "}
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
          </label>
          <button onClick={() => handleCombat()} disabled={isCombatOver}>
            Combatti
          </button>
          {characterSheet.ep <= 0 && <p>💀 Sei morto</p>}
          {enemy.ep <= 0 && <p>🏆 Nemico sconfitto</p>}

          {combatResult && (
            <div>
              <p>Log Combattimento:</p>
              <ul>
                {combatLog.map((log, i) => (
                  <li key={i}>
                    Round {log.round}: Tu perdi {log.playerDamage} EP, Nemico
                    perde {log.enemyDamage} EP
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
