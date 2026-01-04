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
          maxLength={20}
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
          add
        </button>
      </div>

      <div className="input-row">
        <p>nome</p>
        <p>del</p>
      </div>

      <ul>
        {characterSheet.specialItems.map((specialItem) => (
          <li key={specialItem.id}>
            {specialItem.name}
            <button onClick={() => removeSpecialItem(specialItem)}>x</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BackpackSpecialSheet;
