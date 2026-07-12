function Header({ level, xp, neededXp }) {
  return (
    <div>
      <div>現在のレベル: {level}</div>
      <div>現在のXP: {xp} / 次のレベルまで: {neededXp}XP</div>
    </div>
  );
}
export default Header;