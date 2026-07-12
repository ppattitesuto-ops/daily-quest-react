import styles from './Header.module.css';

function Header({ level, xp, neededXp }) {
  return (
    <div className={styles.statusWindow}>
      <div className={styles.name}>
        名前:???
      </div>
      <div className={styles.statusText}>
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