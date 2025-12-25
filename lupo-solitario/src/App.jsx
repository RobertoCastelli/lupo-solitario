import { useState } from "react";

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

function App() {
  console.log("App component rendering");
  const [diceRoll, setDiceRoll] = useState(null);
  const [backpackInput, setBackpackInput] = useState("");
  const [backpackSpecialInput, setBackpackSpecialInput] = useState("");
  const [characterSheet, setCharacterSheet] = useState(DEFAULT_SHEET);

  function roll(max = 10) {
    return Math.floor(Math.random() * max);
  }

  function rollDice() {
    const rollValue = roll(10);
    setDiceRoll(rollValue);
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

  return (
    <div>
      <h1>Lupo Solitario</h1>
      <p>registro di guerra</p>

      <section>
        <button onClick={rollDice}>Roll Dice</button>
        {diceRoll !== null && <p>🎲 Dice Roll: {diceRoll}</p>}
      </section>

      <section>
        <button onClick={resetInitialSetup}>Reset Initial Setup</button>
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

      <section>
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

      <section>
        <h3>Armamento ({characterSheet.weapons.length} / 2)</h3>
        <button
          onClick={setInitialWeapons}
          disabled={characterSheet.setup.weaponsSet}
        >
          set initial weapon
        </button>
        <ul>
          {characterSheet.weapons.map((weapon, i) => (
            <li key={i}>
              {weapon} <button onClick={() => removeWeapon(weapon)}> ❌</button>
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
            characterSheet.backpack.length >= 8 || backpackInput.trim() === ""
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
              <button onClick={() => removeBackpackItem(object)}> ❌</button>
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
    </div>
  );
}

export default App;
