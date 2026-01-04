const CharacterSheet = ({
  characterSheet,
  changeValue,
  eatMeal,
  segnalibro,
  rollDice,
  rollDiceValue,
  rollState,
}) => {
  return (
    <>
      <section className="scheda">
        <h3>status</h3>

        <div className="scheda-cs-ep">
          <div className="scheda-cs">
            <div>
              <label>CS: </label>
              <span>{characterSheet.cs}</span>{" "}
            </div>
            <div className="btn-group-change-value">
              <button
                onClick={() => changeValue("cs", -1, 0, characterSheet.csMax)}
              >
                -
              </button>
              <button
                onClick={() => changeValue("cs", 1, 0, characterSheet.csMax)}
              >
                +
              </button>
            </div>
          </div>

          <div className="scheda-ep">
            <div>
              <label>EP: </label>
              <span>{characterSheet.ep}</span> / {characterSheet.epMax}{" "}
            </div>
            <div className="btn-group-change-value">
              <button
                onClick={() => changeValue("ep", -1, 0, characterSheet.epMax)}
              >
                -
              </button>
              <button
                onClick={() => changeValue("ep", 1, 0, characterSheet.epMax)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="scheda-utility">
          <div className="scheda-segnalibro">
            <input
              type="number"
              placeholder="segnalibro"
              value={characterSheet.segnalibro}
              onChange={(e) => segnalibro(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </div>

          <div className="btn-group-change-value">
            <button
              onClick={eatMeal}
              disabled={
                characterSheet.ep >= characterSheet.epMax ||
                characterSheet.meals <= 0 ||
                characterSheet.ep <= 0
              }
            >
              🥪
            </button>
          </div>
        </div>
      </section>

      <section className="borsa">
        <h3>borsa</h3>

        <div className="borsa-oro">
          <div>
            <label>oro: </label>
            <span>{characterSheet.gold}</span> / 50{" "}
          </div>

          <div className="btn-group-change-value">
            <button onClick={() => changeValue("gold", -1, 0, 50)}>-</button>
            <button onClick={() => changeValue("gold", 1, 0, 50)}>+</button>
          </div>
        </div>

        <div className="borsa-pasti">
          <div>
            <label>pasti: </label>
            <span>{characterSheet.meals}</span> / 3{" "}
          </div>

          <div className="btn-group-change-value">
            <button onClick={() => changeValue("meals", -1, 0, 3)}>-</button>
            <button onClick={() => changeValue("meals", 1, 0, 3)}>+</button>
          </div>
        </div>

        <div className="borsa-dadi">
          <div>
            <label>esito: </label>
            {rollState === "rolling" && <span className="dice-rolling"></span>}
            {rollState === "idle" && <span>/</span>}
            {rollState === "done" && <span>{rollDiceValue}</span>}
          </div>

          <div className="btn-group-change-value">
            <button onClick={() => rollDice(10)}>🎲</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CharacterSheet;
