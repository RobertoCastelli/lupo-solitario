const WeaponSheet = ({
  characterSheet,
  setInitialWeapons,
  weaponInput,
  setWeaponInput,
  addWeapon,
  removeWeapon,
}) => {
  return (
    <section>
      <div>WeaponSheet</div>
      <h3>Armamento ({characterSheet.weapons.length} / 2)</h3>
      <button
        onClick={setInitialWeapons}
        disabled={characterSheet.setup.weaponsSet}
      >
        set initial weapon
      </button>
      <input
        type="text"
        placeholder="arma"
        value={weaponInput}
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
