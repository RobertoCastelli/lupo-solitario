import { useEffect, useState } from "react";
import "./styles/app.css";
import "./styles/buttons.css";
import "./styles/inputs.css";
import "./styles/sections.css";
import "./styles/combat.css";
import {
  DEFAULT_SHEET,
  KAI_DISCIPLINES,
  WEAPONS,
  COMBAT_TABLE,
} from "./data/constants";
import Header from "./components/Header";
import CombatSheet from "./components/CombatSheet";
import CharacterSheet from "./components/CharacterSheet";
import DisciplinesSheet from "./components/DisciplinesSheet";
import WeaponSheet from "./components/WeaponSheet";
import BackpackSheet from "./components/BackpackSheet";
import BackpackSpecialSheet from "./components/BackpackSpecialSheet";
import Footer from "./components/Footer";

function App() {
  console.log("App component rendering");
  const [characterSheet, setCharacterSheet] = useState(() => {
    const savedCharacterSheet = localStorage.getItem("lw_characterSheet");
    return savedCharacterSheet
      ? JSON.parse(savedCharacterSheet)
      : DEFAULT_SHEET;
  });
  const [activeSheet, setActiveSheet] = useState("char_sheet");
  const [backpackInput, setBackpackInput] = useState("");
  const [backpackSpecialInput, setBackpackSpecialInput] = useState("");
  const [weaponInput, setWeaponInput] = useState("");
  const [combatResult, setCombatResult] = useState(null);
  const [combatLog, setCombatLog] = useState([]);
  const [enemy, setEnemy] = useState({
    cs: 0,
    ep: 0,
    immuneToPsicolaser: false,
  });

  useEffect(() => {
    localStorage.setItem("lw_characterSheet", JSON.stringify(characterSheet));
  }, [characterSheet]);

  useEffect(() => {
    if (activeSheet === "char_sheet") {
      resetCombat();
    }
  }, [activeSheet]);

  // ===== CHARACTER SETUP =====

  function startAdventure() {
    resetGame();
    setInitialCs();
    setInitialEp();
    setInitialGold();
    setInitialWeapons();
  }

  function setInitialCs() {
    const initialCs = roll(10) + 10;
    setCharacterSheet((prev) => ({
      ...prev,
      cs: initialCs,
      csMax: initialCs,
    }));
  }

  function setInitialEp() {
    const initialEp = roll(10) + 20;
    setCharacterSheet((prev) => ({
      ...prev,
      ep: initialEp,
      epMax: initialEp,
    }));
  }

  function setInitialGold() {
    const initialGold = roll(10);
    setCharacterSheet((prev) => ({
      ...prev,
      gold: initialGold,
    }));
  }

  function setInitialWeapons() {
    const weapon = WEAPONS[roll(WEAPONS.length)];
    setCharacterSheet((prev) => ({
      ...prev,
      weapons: [weapon],
    }));
  }

  // ===== UTILS =====

  function roll(max = 10) {
    return Math.floor(Math.random() * max);
  }

  function resetGame() {
    localStorage.removeItem("lw_characterSheet");
    setCharacterSheet(DEFAULT_SHEET);
    setEnemy({ cs: 0, ep: 0, immuneToPsicolaser: false });
    setCombatResult(null);
    setCombatLog([]);
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

  function eatMeal() {
    setCharacterSheet((prev) => {
      if (prev.meals <= 0) return prev; // No meals left
      if (prev.ep >= prev.epMax) return prev; // EP already full

      return {
        ...prev,
        meals: prev.meals - 1,
        ep: prev.epMax,
      };
    });
  }

  // ===== INVENTORY =====

  function addWeapon(weapon) {
    setCharacterSheet((prev) => {
      if (prev.weapons.length >= 2) return prev; // Max 2 weapons

      return {
        ...prev,
        weapons: [...prev.weapons, weapon],
      };
    });
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

  // ===== COMBAT LOGIC =====

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
    let modifierUnarmed = 0;
    // Psicolaser
    if (
      characterSheet.disciplines.includes("Psicolaser") &&
      !enemy.immuneToPsicolaser
    ) {
      modifierPsicolaser = 2;
    }
    // Scherma
    if (
      characterSheet.disciplines.includes("Scherma") &&
      characterSheet.schermaWeapon &&
      characterSheet.weapons.includes(characterSheet.schermaWeapon)
    ) {
      modifierScherma = 2;
    }
    // Unarmed
    if (characterSheet.weapons.length === 0) {
      modifierUnarmed = -4;
    }

    return { modifierPsicolaser, modifierScherma, modifierUnarmed };
  }

  const { modifierPsicolaser, modifierScherma, modifierUnarmed } =
    modifierCombat(characterSheet, enemy);
  const modifiers = modifierPsicolaser + modifierScherma + modifierUnarmed;
  const modifiedPlayerCS = characterSheet.cs + modifiers;
  const isCombatOver =
    characterSheet.ep <= 0 ||
    enemy.ep <= 0 ||
    (combatResult &&
      (combatResult.playerDamage === "K" || combatResult.enemyDamage === "K"));

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
      rollValue,
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

    setCombatLog((prev) => [
      ...prev,
      {
        // 🎲 tiro
        roll: result.rollValue,
        round: prev.length + 1,

        // CS dettagliata
        playerCSBase: characterSheet.cs,
        playerCSModifiers: modifiers,
        playerCSTotal: modifiedPlayerCS,

        enemyCS: enemy.cs,

        // rapporto reale
        ratio: modifiedPlayerCS - enemy.cs,

        // EP prima / dopo
        playerEPBefore: characterSheet.ep,
        playerEPAfter: result.updatePlayerEP,

        enemyEPBefore: enemy.ep,
        enemyEPAfter: result.updateEnemyEP,
      },
    ]);

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

  function resetCombat() {
    setEnemy({
      cs: 0,
      ep: 0,
      immuneToPsicolaser: false,
    });
    setCombatLog([]);
    setCombatResult(null);
  }

  return (
    <div className="container">
      <Header startAdventure={startAdventure} setActiveSheet={setActiveSheet} />
      <div className="content">
        {activeSheet === "char_sheet" && (
          <>
            <CharacterSheet
              characterSheet={characterSheet}
              changeValue={changeValue}
              eatMeal={eatMeal}
            />
            <DisciplinesSheet
              characterSheet={characterSheet}
              toggleDiscipline={toggleDiscipline}
              KAI_DISCIPLINES={KAI_DISCIPLINES}
            />
            <WeaponSheet
              characterSheet={characterSheet}
              weaponInput={weaponInput}
              setWeaponInput={setWeaponInput}
              addWeapon={addWeapon}
              removeWeapon={removeWeapon}
            />

            <BackpackSheet
              characterSheet={characterSheet}
              backpackInput={backpackInput}
              setBackpackInput={setBackpackInput}
              addBackpackItem={addBackpackItem}
              removeBackpackItem={removeBackpackItem}
            />

            <BackpackSpecialSheet
              characterSheet={characterSheet}
              backpackSpecialInput={backpackSpecialInput}
              setBackpackSpecialInput={setBackpackSpecialInput}
              addSpecialItem={addSpecialItem}
              removeSpecialItem={removeSpecialItem}
            />
          </>
        )}
        {activeSheet === "combat_sheet" && (
          <>
            <CombatSheet
              setCombatLog={setCombatLog}
              characterSheet={characterSheet}
              enemy={enemy}
              setEnemy={setEnemy}
              handleCombat={handleCombat}
              isCombatOver={isCombatOver}
              combatResult={combatResult}
              combatLog={combatLog}
              modifiedPlayerCS={modifiedPlayerCS}
              modifiers={modifiers}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
