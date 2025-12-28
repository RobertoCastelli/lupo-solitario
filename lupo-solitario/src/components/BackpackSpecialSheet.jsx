const BackpackSpecialSheet = ({
  characterSheet,
  backpackSpecialInput,
  setBackpackSpecialInput,
  addSpecialItem,
  removeSpecialItem,
}) => {
  return (
    <section className="oggetti-speciali">
      <h3>oggetti speciali (∞)</h3>
      <div className="input-row">
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
      </div>
      <ul>
        {characterSheet.specialItems.map((specialItem, i) => (
          <li key={i}>
            {specialItem}
            <button onClick={() => removeSpecialItem(specialItem)}> ❌</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BackpackSpecialSheet;
