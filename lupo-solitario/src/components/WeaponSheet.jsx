const WeaponSheet = ({
  characterSheet,
  weaponInput,
  setWeaponInput,
  addWeapon,
  removeWeapon,
}) => {
  return (
    <section className="armamento">
      <h3>armamento ({characterSheet.weapons.length} / 2)</h3>
      <div className="input-row">
        <input
          type="text"
          placeholder="arma"
          value={weaponInput}
          maxLength={20}
          onChange={(e) => setWeaponInput(e.target.value)}
        />
        <button
          disabled={
            characterSheet.weapons.length >= 2 || weaponInput.trim() === ""
          }
          onClick={() => {
            addWeapon(weaponInput.trim());
            setWeaponInput("");
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {characterSheet.weapons.map((weapon, i) => (
          <li key={i}>
            {weapon} <button onClick={() => removeWeapon(weapon)}> ❌</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeaponSheet;
