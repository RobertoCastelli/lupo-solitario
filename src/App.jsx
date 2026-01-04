import { useEffect, useState } from "react";
import "./styles/app.css";
import "./styles/buttons.css";
import "./styles/inputs.css";
import "./styles/sections.css";
import "./styles/combat.css";
import "./styles/scheda.css";
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
  const [characterSheet, setCharacterSheet] = useState(() => {
    const savedCharacterSheet = localStorage.getItem("lw_characterSheet");
    return savedCharacterSheet
      ? JSON.parse(savedCharacterSheet)
      : DEFAULT_SHEET;
  });
  const [rollState, setRollState] = useState("idle");
  const [rollDiceValue, setRollDiceValue] = useState(null);
  const [activeSheet, setActiveSheet] = useState("char_sheet");
  const [backpackInput, setBackpackInput] = useState("");
  const [backpackSpecialInput, setBackpackSpecialInput] = useState("");
  const [weaponInput, setWeaponInput] = useState("");
  const [alterCS, setAlterCS] = useState(0);
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
    localStorage.removeItem("lw_characterSheet");

    const initialCS = roll(10) + 11;
    const initialEP = roll(10) + 21;
    const initialGold = roll(10);
    const initialWeapon = WEAPONS[roll(WEAPONS.length)].toLowerCase();

    setCharacterSheet({
      ...DEFAULT_SHEET,
      cs: initialCS,
      csMax: initialCS,
      ep: initialEP,
      epMax: initialEP,
      gold: initialGold,
      weapons: [
        {
          id: Date.now(),
          name: initialWeapon.toLowerCase(),
          isEquipped: false,
          csMod: 0,
        },
      ],
    });

    setEnemy({ cs: 0, ep: 0, immuneToPsicolaser: false });
    setCombatResult(null);
    setCombatLog([]);
    setAlterCS(0);
  }

  // ===== UTILS =====

  function roll(max = 10) {
    return Math.floor(Math.random() * max);
  }

  function rollDice(max = 10) {
    setRollDiceValue(null);
    setRollState("rolling");

    setTimeout(() => {
      const rollValue = Math.floor(Math.random() * max);
      setRollDiceValue(rollValue);
      setRollState("done");
    }, 3000);

    setTimeout(() => {
      setRollDiceValue(null);
      setRollState("idle");
    }, 5000);
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

  function segnalibro(paragrafo) {
    setCharacterSheet((prev) => {
      return {
        ...prev,
        segnalibro: paragrafo,
      };
    });
  }

  // ===== INVENTORY =====

  function addWeapon(weapon) {
    setCharacterSheet((prev) => {
      if (prev.weapons.length >= 2) return prev; // Max 2 weapons

      const newWeapon = {
        id: Date.now(),
        name: weapon.trim().toLowerCase(),
        isEquipped: false,
        csMod: 0,
      };

      return {
        ...prev,
        weapons: [...prev.weapons, newWeapon],
      };
    });
  }

  function removeWeapon(weapon) {
    setCharacterSheet((prev) => {
      return {
        ...prev,
        weapons: prev.weapons.filter((w) => w.id !== weapon.id),
      };
    });
  }

  function toggleWeapon(id) {
    setCharacterSheet((prev) => ({
      ...prev,
      weapons: prev.weapons.map((w) =>
        w.id === id ? { ...w, isEquipped: !w.isEquipped } : w
      ),
    }));
  }

  function updateWeaponModifier(id, mod) {
    setCharacterSheet((prev) => ({
      ...prev,
      weapons: prev.weapons.map((w) =>
        w.id === id ? { ...w, csMod: mod } : w
      ),
    }));
  }

  function addBackpackItem(item) {
    setCharacterSheet((prev) => {
      if (!item) return prev; // Avoid empty items
      if (prev.backpack.length >= 8) return prev; // Max 8 items

      const newItem = {
        id: Date.now(),
        name: item.trim().toLowerCase(),
      };

      return {
        ...prev,
        backpack: [...prev.backpack, newItem],
      };
    });
  }

  function removeBackpackItem(item) {
    setCharacterSheet((prev) => {
      return {
        ...prev,
        backpack: prev.backpack.filter((i) => i.id !== item.id),
      };
    });
  }

  function addSpecialItem(specialItem) {
    setCharacterSheet((prev) => {
      const newSpecialItem = {
        id: Date.now(),
        name: specialItem.trim().toLowerCase(),
      };

      return {
        ...prev,
        specialItems: [...prev.specialItems, newSpecialItem],
      };
    });
  }

  function removeSpecialItem(specialItem) {
    setCharacterSheet((prev) => {
      return {
        ...prev,
        specialItems: prev.specialItems.filter((i) => i.id !== specialItem.id),
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
          schermaWeapon: WEAPONS[roll(WEAPONS.length)].toLowerCase(),
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

  // Get psicolaser, scherma, unarmed
  function getDisciplineModifiers(characterSheet, enemy) {
    let psicolaser = 0;
    let scherma = 0;
    let unarmed = 0;
    // Psicolaser
    if (
      characterSheet.disciplines.includes("Psicolaser") &&
      !enemy.immuneToPsicolaser
    ) {
      psicolaser = 2;
    }
    // Scherma
    if (
      characterSheet.disciplines.includes("Scherma") &&
      characterSheet.weapons.some(
        (w) => w.name === characterSheet.schermaWeapon && w.isEquipped
      )
    ) {
      scherma = 2;
    }
    // Unarmed
    const hasWeaponEquipped = characterSheet.weapons.some((w) => w.isEquipped);
    if (!hasWeaponEquipped) {
      unarmed = -4;
    }
    return { psicolaser, scherma, unarmed };
  }

  // Get bonus arma equipaggiata
  function getEquippedWeaponBonus(weapons) {
    return weapons
      .filter((w) => w.isEquipped)
      .reduce((sum, w) => sum + (w.csMod || 0), 0);
  }

  // Totale di tutti i modificatori da sommare al Player CS
  const weaponBonus = getEquippedWeaponBonus(characterSheet.weapons);
  const disciplineModifiers = getDisciplineModifiers(characterSheet, enemy);
  const combatModifiers = {
    psicolaser: disciplineModifiers.psicolaser,
    scherma: disciplineModifiers.scherma,
    disarmato: disciplineModifiers.unarmed,
    armi: weaponBonus,
  };
  const totalModifiers = Object.values(combatModifiers).reduce(
    (sum, v) => sum + v,
    0
  );
  const playerCombatCS = characterSheet.cs + totalModifiers;

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
      playerCS: playerCombatCS + alterCS,
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

  // Verifica se il combattimento è terminato
  const isCombatOver = isEndOfCombat(characterSheet, enemy, combatResult);
  function isEndOfCombat(characterSheet, enemy, combatResult) {
    if (characterSheet.ep <= 0) return true;
    if (enemy.ep <= 0) return true;
    if (!combatResult) return false;
    return (
      combatResult.playerDamage === "K" || combatResult.enemyDamage === "K"
    );
  }

  function resetCombat() {
    setEnemy({
      cs: 0,
      ep: 0,
      immuneToPsicolaser: false,
    });
    setCombatLog([]);
    setCombatResult(null);
    setAlterCS(0);
  }

  return (
    <div className="container">
      <Header
        startAdventure={startAdventure}
        setActiveSheet={setActiveSheet}
        activeSheet={activeSheet}
      />
      <div className="content">
        {activeSheet === "char_sheet" && (
          <>
            <CharacterSheet
              characterSheet={characterSheet}
              changeValue={changeValue}
              eatMeal={eatMeal}
              segnalibro={segnalibro}
              rollDice={rollDice}
              rollDiceValue={rollDiceValue}
              rollState={rollState}
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
              toggleWeapon={toggleWeapon}
              updateWeaponModifier={updateWeaponModifier}
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
              characterSheet={characterSheet}
              enemy={enemy}
              setEnemy={setEnemy}
              handleCombat={handleCombat}
              isCombatOver={isCombatOver}
              combatResult={combatResult}
              combatLog={combatLog}
              weaponBonus={weaponBonus}
              alterCS={alterCS}
              setAlterCS={setAlterCS}
              playerCombatCS={playerCombatCS}
              totalModifiers={totalModifiers}
              psicolaser={disciplineModifiers.psicolaser}
              scherma={disciplineModifiers.scherma}
              unarmed={disciplineModifiers.unarmed}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
