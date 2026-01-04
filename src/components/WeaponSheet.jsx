const WeaponSheet = ({
  characterSheet,
  weaponInput,
  setWeaponInput,
  addWeapon,
  removeWeapon,
  toggleWeapon,
  updateWeaponModifier,
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
          onFocus={(e) => e.target.select()}
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
          add
        </button>
      </div>

      <div className="input-row">
        <p>equip</p>
        <p>mod | del</p>
      </div>

      <ul>
        {characterSheet.weapons.map((weapon) => (
          <li key={weapon.id}>
            <div className="input-row">
              <input
                type="checkbox"
                checked={weapon.isEquipped}
                onChange={() => toggleWeapon(weapon.id)}
              />
              {weapon.name}
            </div>
            <div className="input-row">
              <input
                className="armamento-input"
                type="number"
                value={weapon.csMod}
                onChange={(e) =>
                  updateWeaponModifier(weapon.id, Number(e.target.value) || 0)
                }
                onFocus={(e) => e.target.select()}
              />
              <button onClick={() => removeWeapon(weapon)}>x</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeaponSheet;
