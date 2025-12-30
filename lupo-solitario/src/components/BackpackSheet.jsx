const BackpackSheet = ({
  characterSheet,
  backpackInput,
  setBackpackInput,
  addBackpackItem,
  removeBackpackItem,
}) => {
  return (
    <section className="zaino">
      <h3>zaino ({characterSheet.backpack.length} / 8)</h3>
      <div className="input-row">
        <input
          type="text"
          placeholder="oggetto"
          value={backpackInput}
          disabled={characterSheet.backpack.length >= 8}
          maxLength={20}
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
      </div>
      <ul>
        {characterSheet.backpack.map((object, i) => (
          <li key={i}>
            {object}
            <button onClick={() => removeBackpackItem(object)}>x</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BackpackSheet;
