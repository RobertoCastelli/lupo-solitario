import { GiCrossedSwords, GiScrollQuill } from "react-icons/gi";

const Header = ({ startAdventure, activeSheet, setActiveSheet }) => {
  return (
    <header>
      <div className="header-title-group">
        <h2>registro di guerra</h2>
        <small>scheda per lupo solitario libro 1-5</small>
      </div>
      <button className="btn-nuova-avventura" onClick={startAdventure}>
        nuova avventura
      </button>
      <div className="header-btn-group">
        <button
          className="btn-char-sheet"
          onClick={() => setActiveSheet("char_sheet")}
          disabled={activeSheet === "char_sheet"}
        >
          <GiScrollQuill className="icon" size={20} />
        </button>
        <button
          className="btn-combat-sheet"
          onClick={() => setActiveSheet("combat_sheet")}
          disabled={activeSheet === "combat_sheet"}
        >
          <GiCrossedSwords className="icon" size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
