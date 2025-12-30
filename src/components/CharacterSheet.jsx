import { GiWolfHead } from "react-icons/gi";

const CharacterSheet = ({
  characterSheet,
  changeValue,
  eatMeal,
  segnalibro,
  rollDice,
  rollDiceValue,
}) => {
  return (
    <>
      <section className="scheda">
        <h3>status</h3>

        <div className="scheda-cs-ep">
          <div>
            <label>CS: </label>
            <span>{characterSheet.cs}</span>
          </div>

          <GiWolfHead size={20} />

          <div>
            <label>EP: </label>
            <span>{characterSheet.ep}</span> / {characterSheet.epMax}
          </div>
        </div>

        <div className="scheda-utility">
          <div className="scheda-segnalibro">
            <input
              type="number"
              placeholder="segnalibro"
              value={characterSheet.segnalibro}
              onChange={(e) => segnalibro(e.target.value)}
              onFocus={(e) => e.target.select}
            />
          </div>
          <div className="btn-mangia-pasto">
            <button
              onClick={eatMeal}
              disabled={
                characterSheet.ep >= characterSheet.epMax ||
                characterSheet.meals <= 0
              }
            >
              mangia
            </button>
          </div>
        </div>
      </section>

      <section className="borsa">
        <h3>borsa</h3>

        <div className="borsa-oro">
          <div>
            <label>corone: </label>
            <span>{characterSheet.gold}</span> / 50{" "}
          </div>
          <div>
            <div className="btn-group-change-value">
              <button onClick={() => changeValue("gold", -1, 0, 50)}>-</button>
              <button onClick={() => changeValue("gold", 1, 0, 50)}>+</button>
            </div>
          </div>
        </div>
        <div className="borsa-pasti">
          <div>
            <label>pasti: </label>
            <span>{characterSheet.meals}</span> / 3{" "}
          </div>
          <div>
            <div className="btn-group-change-value">
              <button onClick={() => changeValue("meals", -1, 0, 3)}>-</button>
              <button onClick={() => changeValue("meals", 1, 0, 3)}>+</button>
            </div>
          </div>
        </div>

        <div className="borsa-dadi">
          <div>{rollDiceValue != null ? rollDiceValue : "- -"}</div>
          <button onClick={() => rollDice(10)}>🎲</button>
        </div>
      </section>
    </>
  );
};

export default CharacterSheet;
