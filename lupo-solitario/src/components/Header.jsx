const Header = ({ startAdventure, setActiveSheet }) => {
  return (
    <header>
      <h2>registro di guerra</h2>
      <button onClick={startAdventure}>nuova avventura</button>
      <div>
        <button onClick={() => setActiveSheet("char_sheet")}>scheda</button>
        <button onClick={() => setActiveSheet("combat_sheet")}>
          combattimento
        </button>
      </div>
    </header>
  );
};

export default Header;
