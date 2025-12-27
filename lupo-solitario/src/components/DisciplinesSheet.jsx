const Disciplines = ({ characterSheet, toggleDiscipline, KAI_DISCIPLINES }) => {
  return (
    <section>
      <div>DisciplinesSheet</div>
      <h3>Discipline Kai ({characterSheet.disciplines.length} / 5)</h3>
      <ul>
        {KAI_DISCIPLINES.map((discipline) => {
          const selected = characterSheet.disciplines.includes(discipline);
          const limitReached = characterSheet.disciplines.length >= 5;
          return (
            <li key={discipline}>
              <label>
                <input
                  type="checkbox"
                  checked={selected}
                  disabled={!selected && limitReached}
                  onChange={() => toggleDiscipline(discipline)}
                />
                {discipline === "Scherma" && selected
                  ? `Scherma 🗡️ arma: ${characterSheet.schermaWeapon}`
                  : discipline}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Disciplines;
