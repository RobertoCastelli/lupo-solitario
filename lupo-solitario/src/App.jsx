import { useState } from "react";
import "./App.css";

const DEFAULT_SHEET = {
  cs: 0,
  ep: 0,
  gold: 0,
  meals: 0,
  weapons: [],
  schermaWeapon: null,
  disciplines: [],
  backpack: [],
  specialItems: [],
  setup: {
    csSet: false,
    epSet: false,
    goldSet: false,
    weaponsSet: false,
  },
};

const KAI_DISCIPLINES = [
  "Mimetismo",
  "Caccia",
  "Sesto Senso",
  "Orientamento",
  "Guarigione",
  "Scherma",
  "Psicoschermo",
  "Psicolaser",
  "Affinità Animale",
  "Telecinesi",
];

const WEAPONS = [
  "Pugnale",
  "Lancia",
  "Daga",
  "Mazza",
  "Martello da Guerra",
  "Spada",
  "Ascia",
  "Spada",
  "Asta",
  "Spadone",
];

const COMBAT_TABLE = [
  // roll = 1
  [
    [0, "K"],
    [0, "K"],
    [0, 8],
    [0, 6],
    [1, 6],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 4],
    [6, 4],
    [7, 4],
    [8, 3],
    [9, 3],
  ],

  // roll = 2
  [
    [0, "K"],
    [0, 8],
    [0, 7],
    [1, 6],
    [2, 5],
    [3, 5],
    [4, 4],
    [5, 4],
    [6, 4],
    [7, 4],
    [8, 3],
    [9, 3],
    [10, 2],
  ],

  // roll = 3
  [
    [0, 8],
    [0, 7],
    [1, 6],
    [2, 5],
    [3, 5],
    [4, 4],
    [5, 4],
    [6, 3],
    [7, 3],
    [8, 2],
    [9, 2],
    [10, 2],
    [11, 2],
  ],

  // roll = 4
  [
    [0, 8],
    [1, 7],
    [2, 6],
    [3, 5],
    [4, 4],
    [5, 4],
    [6, 3],
    [7, 3],
    [8, 2],
    [9, 2],
    [10, 2],
    [11, 2],
    [12, 2],
  ],

  // roll = 5
  [
    [1, 7],
    [2, 6],
    [3, 5],
    [4, 4],
    [5, 4],
    [6, 3],
    [7, 2],
    [8, 2],
    [9, 2],
    [10, 2],
    [11, 1],
    [12, 1],
    [14, 1],
  ],

  // roll = 6
  [
    [2, 6],
    [3, 6],
    [4, 5],
    [5, 4],
    [6, 3],
    [7, 2],
    [8, 2],
    [9, 2],
    [10, 2],
    [11, 1],
    [12, 1],
    [14, 1],
    [16, 1],
  ],

  // roll = 7
  [
    [3, 5],
    [4, 5],
    [5, 4],
    [6, 3],
    [7, 2],
    [8, 2],
    [9, 1],
    [10, 1],
    [11, 1],
    [12, 0],
    [14, 0],
    [16, 0],
    [18, 0],
  ],

  // roll = 8
  [
    [4, 4],
    [5, 4],
    [6, 3],
    [7, 2],
    [8, 1],
    [9, 1],
    [10, 0],
    [11, 0],
    [12, 0],
    [14, 0],
    [16, 0],
    [18, 0],
    ["K", 0],
  ],

  // roll = 9
  [
    [5, 3],
    [6, 3],
    [7, 2],
    [8, 0],
    [9, 0],
    [10, 0],
    [11, 0],
    [12, 0],
    [14, 0],
    [16, 0],
    [18, 0],
    ["K", 0],
    ["K", 0],
  ],

  // roll = 0
  [
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [10, 0],
    [11, 0],
    [12, 0],
    [14, 0],
    [16, 0],
    [18, 0],
    ["K", 0],
    ["K", 0],
    ["K", 0],
  ],
];

function App() {
  console.log("App component rendering");
  const [characterSheet, setCharacterSheet] = useState(DEFAULT_SHEET);
  const [backpackInput, setBackpackInput] = useState("");
  const [backpackSpecialInput, setBackpackSpecialInput] = useState("");
  const [weaponInput, setWeaponInput] = useState("");
  const [activeTab, setActiveTab] = useState("sheet");

  const [enemy, setEnemy] = useState({
    cs: 0,
    ep: 0,
    immuneToPsicolaser: false,
  });
  const [combatResult, setCombatResult] = useState(null);

  function roll(max = 10) {
    return Math.floor(Math.random() * max);
  }

  function resetInitialSetup() {
    setCharacterSheet(DEFAULT_SHEET);
  }

  function changeValue(field, delta, min, max) {
    setCharacterSheet((prev) => {
      const newValue = prev[field] + delta;
      if (newValue < min || newValue > max) return prev; // No change if out of bounds

      return {
        ...prev,
        [field]: newValue,
      };
    });
  }

  function setInitialCs() {
    const initialCs = roll(10) + 11;
    setCharacterSheet((prev) => ({
      ...prev,
      cs: initialCs,
      setup: { ...prev.setup, csSet: true },
    }));
  }

  function setInitialEp() {
    const initialEp = roll(10) + 21;
    setCharacterSheet((prev) => ({
      ...prev,
      ep: initialEp,
      setup: { ...prev.setup, epSet: true },
    }));
  }

  function setInitialGold() {
    const initialGold = roll(10);
    setCharacterSheet((prev) => ({
      ...prev,
      gold: initialGold,
      setup: { ...prev.setup, goldSet: true },
    }));
  }

  function setInitialWeapons() {
    const weapon = WEAPONS[roll(WEAPONS.length)];
    setCharacterSheet((prev) => ({
      ...prev,
      weapons: [weapon],
      setup: { ...prev.setup, weaponsSet: true },
    }));
  }

  function removeWeapon(weapon) {
    setCharacterSheet((prev) => {
      return {
        ...prev,
        weapons: prev.weapons.filter((w) => w !== weapon),
      };
    });
  }

  function addBackpackItem(item) {
    setCharacterSheet((prev) => {
      if (!item) return prev; // Avoid empty items
      if (prev.backpack.length >= 8) return prev; // Max 8 items

      return {
        ...prev,
        backpack: [...prev.backpack, item],
      };
    });
  }

  function removeBackpackItem(item) {
    setCharacterSheet((prev) => {
      return {
        ...prev,
        backpack: prev.backpack.filter((i) => i !== item),
      };
    });
  }

  function addSpecialItem(item) {
    setCharacterSheet((prev) => {
      if (!item) return prev; // Avoid empty items
      if (prev.specialItems.includes(item)) return prev; // Avoid duplicates

      return {
        ...prev,
        specialItems: [...prev.specialItems, item],
      };
    });
  }

  function removeSpecialItem(item) {
    setCharacterSheet((prev) => {
      return {
        ...prev,
        specialItems: prev.specialItems.filter((i) => i !== item),
      };
    });
  }

  function addWeapon(weapon) {
    setCharacterSheet((prev) => {
      if (prev.weapons.length >= 2) return prev; // Max 2 weapons

      return {
        ...prev,
        weapons: [...prev.weapons, weapon],
      };
    });
  }

  function toggleDiscipline(discipline) {
    setCharacterSheet((prev) => {
      const selected = prev.disciplines.includes(discipline);

      if (!selected && prev.disciplines.length >= 5) {
        return prev;
      }

      if (selected && discipline === "Scherma") {
        return {
          ...prev,
          disciplines: prev.disciplines.filter((d) => d !== discipline),
          schermaWeapon: null,
        };
      }

      if (discipline === "Scherma" && !selected) {
        return {
          ...prev,
          disciplines: [...prev.disciplines, discipline],
          schermaWeapon: WEAPONS[roll(WEAPONS.length)],
        };
      }

      return {
        ...prev,
        disciplines: selected
          ? prev.disciplines.filter((d) => d !== discipline)
          : [...prev.disciplines, discipline],
      };
    });
  }

  function getCombatRatiofromTable(ratio) {
    if (ratio <= -11) return 0;
    if (ratio <= -9) return 1;
    if (ratio <= -7) return 2;
    if (ratio <= -5) return 3;
    if (ratio <= -3) return 4;
    if (ratio <= -1) return 5;
    if (ratio === 0) return 6;
    if (ratio <= 2) return 7;
    if (ratio <= 4) return 8;
    if (ratio <= 6) return 9;
    if (ratio <= 8) return 10;
    if (ratio <= 10) return 11;
    return 12;
  }

  function modifierCombat(characterSheet, enemy) {
    let modifierPsicolaser = 0;
    let modifierScherma = 0;

    if (
      characterSheet.disciplines.includes("Psicolaser") &&
      !enemy.immuneToPsicolaser
    ) {
      modifierPsicolaser = 2;
    }
    if (
      characterSheet.disciplines.includes("Scherma") &&
      characterSheet.schermaWeapon &&
      characterSheet.weapons.includes(characterSheet.schermaWeapon)
    ) {
      modifierScherma = 2;
    }
    return { modifierPsicolaser, modifierScherma };
  }

  const { modifierPsicolaser, modifierScherma } = modifierCombat(
    characterSheet,
    enemy
  );
  const modifiers = modifierPsicolaser + modifierScherma;
  const modifiedPlayerCS = characterSheet.cs + modifiers;

  function resolveCombat({ playerCS, enemyCS, playerEP, enemyEP }) {
    const ratio = playerCS - enemyCS;
    const rollValue = roll(10);
    const ratioIndex = getCombatRatiofromTable(ratio);

    const [enemyDamage, playerDamage] = COMBAT_TABLE[rollValue][ratioIndex];
    const updateEnemyEP =
      enemyDamage === "K" ? 0 : Math.max(0, enemyEP - enemyDamage);
    const updatePlayerEP =
      playerDamage === "K" ? 0 : Math.max(0, playerEP - playerDamage);

    return {
      playerCS,
      enemyCS,
      playerEP,
      enemyEP,
      enemyDamage,
      playerDamage,
      updateEnemyEP,
      updatePlayerEP,
    };
  }

  function handleCombat() {
    const result = resolveCombat({
      playerCS: modifiedPlayerCS,
      enemyCS: enemy.cs,
      playerEP: characterSheet.ep,
      enemyEP: enemy.ep,
    });

    setCharacterSheet((prev) => ({
      ...prev,
      ep: result.updatePlayerEP,
    }));

    setEnemy((prev) => ({
      ...prev,
      ep: result.updateEnemyEP,
    }));

    setCombatResult(result);
  }

  return (
    <div>
      <h1>Lupo Solitario</h1>
      <p>registro di guerra</p>

      {activeTab === "sheet" && (
        <>
          <section>
            <button onClick={resetInitialSetup}>Reset Initial Setup</button>
          </section>
          <section>
            <button onClick={() => setActiveTab("combat")}>
              Combattimento
            </button>
          </section>
          <section>
            <h2>Scheda</h2>
            <ul>
              <li>
                ⚔️ Combattività (CS): {characterSheet.cs}{" "}
                <button
                  onClick={setInitialCs}
                  disabled={characterSheet.setup.csSet}
                >
                  set initial cs
                </button>
              </li>
              <li>
                ❤️ Resistenza (EP): {characterSheet.ep}{" "}
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
                <button onClick={() => changeValue("gold", -1, 0, 50)}>
                  -
                </button>
                <button onClick={() => changeValue("gold", 1, 0, 50)}>+</button>
              </li>
              <li>
                🍞 Pasti: {characterSheet.meals} / 3{" "}
                <button onClick={() => changeValue("meals", -1, 0, 3)}>
                  -
                </button>
                <button onClick={() => changeValue("meals", 1, 0, 3)}>+</button>
              </li>
            </ul>
          </section>
          <section>
            <h3>Discipline Kai ({characterSheet.disciplines.length} / 5)</h3>
            <ul>
              {KAI_DISCIPLINES.map((discipline) => {
                const selected =
                  characterSheet.disciplines.includes(discipline);
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
          <section>
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
                  {weapon}{" "}
                  <button onClick={() => removeWeapon(weapon)}> ❌</button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Zaino ({characterSheet.backpack.length} / 8)</h3>
            <input
              type="text"
              placeholder="oggetto"
              value={backpackInput}
              disabled={characterSheet.backpack.length >= 8}
              onChange={(e) => setBackpackInput(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <button
              disabled={
                characterSheet.backpack.length >= 8 ||
                backpackInput.trim() === ""
              }
              onClick={() => {
                addBackpackItem(backpackInput.trim());
                setBackpackInput("");
              }}
            >
              Add
            </button>
            <ol>
              {characterSheet.backpack.map((object, i) => (
                <li key={i}>
                  {object}
                  <button onClick={() => removeBackpackItem(object)}>
                    {" "}
                    ❌
                  </button>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h3>Oggetti Speciali</h3>
            <input
              type="text"
              placeholder="oggetto speciale"
              value={backpackSpecialInput}
              onChange={(e) => {
                setBackpackSpecialInput(e.target.value);
              }}
              onFocus={(e) => e.target.select()}
            />
            <button
              disabled={backpackSpecialInput.trim() === ""}
              onClick={() => {
                addSpecialItem(backpackSpecialInput.trim());
                setBackpackSpecialInput("");
              }}
            >
              Add
            </button>
            <ul>
              {characterSheet.specialItems.map((specialItem, i) => (
                <li key={i}>
                  {specialItem}
                  <button onClick={() => removeSpecialItem(specialItem)}>
                    {" "}
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === "combat" && (
        <>
          <section>
            <button onClick={() => setActiveTab("sheet")}>Sheet</button>
          </section>
          <section>
            <h2>Combattimento</h2>
            <div>
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
              <button onClick={() => handleCombat()}>Combatti</button>
              {combatResult && (
                <div>
                  <p>Nemico perde: {combatResult.enemyDamage} EP</p>
                  <p>Tu perdi: {combatResult.playerDamage} EP</p>
                  <p>EP Nemico: {enemy.ep}</p>
                  <p>EP Tuoi: {characterSheet.ep}</p>
                  <p>Modificatori: {modifiedPlayerCS}</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
