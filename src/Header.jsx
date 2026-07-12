function Header({ level, xp, neededXp }) {
  return (
    <div style={{
      backgroundColor: '#000000',
      border: '3px double #ffffff',
      borderRadius: '0px',
      padding: '15px',
      width: '150px',
      fontFamily: '"DotGothic16", sans-serif',
      margin:'16px auto'
    }}>
      <div style={{ marginBottom: '10px', fontSize: '18px', letterSpacing: '2px' }}>
        名前:???
      </div>
      <div style={{ fontSize: '14px', marginBottom: '5px' }}>
        LV {level}
      </div>
      <div style={{ fontSize: '14px' }}>
        XP {xp}
      </div>
      <div style={{ fontSize: '14px', color:'gray' }}>(NEXT LV: {neededXp}XP)</div>
    </div>
  );
}
export default Header;