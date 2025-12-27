const Header = ({ startAdventure }) => {
  return (
    <header>
      <h1>registro di guerra</h1>
      <button onClick={startAdventure}>nuova avventura</button>
    </header>
  );
};

export default Header;
