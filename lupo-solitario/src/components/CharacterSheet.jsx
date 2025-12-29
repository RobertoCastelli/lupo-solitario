const CharacterSheet = ({ characterSheet, changeValue, eatMeal }) => {
  return (
    <>
      <section className="scheda">
        <h3>scheda</h3>
        <ul>
          <li>
            <label>Combattività (CS):</label> {characterSheet.cs}
          </li>
          <li>
            <label>Resistenza (EP):</label>
            {characterSheet.ep}/{characterSheet.epMax}
          </li>
          <li>
            Corone d'oro: {characterSheet.gold} / 50{" "}
            <div>
              <button onClick={() => changeValue("gold", -1, 0, 50)}>➖</button>
              <button onClick={() => changeValue("gold", 1, 0, 50)}>➕</button>
            </div>
          </li>
          <li>
            Pasti: {characterSheet.meals} / 3{" "}
            <div>
              <button onClick={eatMeal}>Mangia pasto</button>
              <button onClick={() => changeValue("meals", -1, 0, 3)}>➖</button>
              <button onClick={() => changeValue("meals", 1, 0, 3)}>➕</button>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
};

export default CharacterSheet;
