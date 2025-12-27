const CharacterSheet = ({
  nuovaPartita,
  characterSheet,
  changeValue,
  setInitialCs,
  setInitialEp,
  setInitialGold,
  eatMeal,
}) => {
  return (
    <>
      <section>
        <button onClick={nuovaPartita}>Nuova partita</button>
      </section>
      <section>
        <button onClick={eatMeal}>Mangia pasto </button>
      </section>
      <section>
        <h2>Scheda</h2>
        <ul>
          <li>
            ⚔️ Combattività (CS): {characterSheet.cs}/{characterSheet.csMax}
            <button
              onClick={setInitialCs}
              disabled={characterSheet.setup.csSet}
            >
              set initial cs
            </button>
          </li>
          <li>
            ❤️ Resistenza (EP): {characterSheet.ep}/{characterSheet.epMax}
            <button
              onClick={setInitialEp}
              disabled={characterSheet.setup.epSet}
            >
              set initial ep
            </button>
          </li>
          <li>
            💰 Corone d'oro: {characterSheet.gold} / 50{" "}
            <button
              onClick={setInitialGold}
              disabled={characterSheet.setup.goldSet}
            >
              set initial gold
            </button>
            <button onClick={() => changeValue("gold", -1, 0, 50)}>-</button>
            <button onClick={() => changeValue("gold", 1, 0, 50)}>+</button>
          </li>
          <li>
            🍞 Pasti: {characterSheet.meals} / 3{" "}
            <button onClick={() => changeValue("meals", -1, 0, 3)}>-</button>
            <button onClick={() => changeValue("meals", 1, 0, 3)}>+</button>
          </li>
        </ul>
      </section>
    </>
  );
};

export default CharacterSheet;
