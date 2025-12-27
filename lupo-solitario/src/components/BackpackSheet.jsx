const BackpackSheet = ({
  characterSheet,
  backpackInput,
  setBackpackInput,
  addBackpackItem,
  removeBackpackItem,
}) => {
  return (
    <section>
      <div>BackpackSheet</div>
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
  );
};

export default BackpackSheet;
