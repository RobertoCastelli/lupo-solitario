const Header = ({ startAdventure, setActiveSheet }) => {
  return (
    <header>
      <h2>registro di guerra</h2>
      <button className="btn-nuova-avventura" onClick={startAdventure}>
        nuova avventura
      </button>
      <div>
        <button
          className="btn-char-sheet"
          onClick={() => setActiveSheet("char_sheet")}
        >
          scheda
        </button>
        <button
          className="btn-combat-sheet"
          onClick={() => setActiveSheet("combat_sheet")}
        >
          combatti
        </button>
      </div>
    </header>
  );
};

export default Header;
