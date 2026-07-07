import { useState } from 'react';

function App() {

  // 【ReactのState定義】
  // [現在の値, 値を更新するための専用の関数] = useState(初期値);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  // 【追記】空の配列（ [] ）を初期値として、questsという状態を作る
  const [quests, setQuests] = useState([]);
  const [inputText, setInputText] = useState('');
  // レベルアップに必要なXPを計算（現在のレベル * 100）
  const neededXp = level * 100;

  // 経験値獲得の処理
  const handleGainXp = () => {
    setXp((prevXp) => {
      const nextXp = prevXp + 10;
      if (nextXp >= level * 100) {
        setLevel(level + 1);
        return 0;
      } else {
        return nextXp;
      }
    })
  };

  const handleAddQuest = () => {
    if (inputText.trim() === '') return;
    const newQuest = {
      id: Date.now(),
      text: inputText,
      isCompleted: false
    };
    setQuests([...quests, newQuest]);
    setInputText('');
  };

  return (
    <div style={{ padding: '20px', background: '#0d1117', color: '#c9d1d9', minHeight: '100vh' }}>
      <h1>Daily Quest (React版)</h1>
      {/* ⭕ Reactの『宣言的UI』：{} で囲むだけで、データが画面に自動連動する */}
      <div>現在のレベル: {level}</div>
      <div>現在のXP: {xp} / 次のレベルまで: {neededXp} XP</div>
      <button onClick={handleGainXp}>経験値+10</button>

      {/* 🛠️ クエスト追加エリア */}
      <div style={{ marginTop: '20px' }}>
        <input
          type='text'
          value={inputText}
          /* 入力された文字をリアルタイムで変数inputTextに同期させるReactの必須コード */
          onChange={(e) => setInputText(e.target.value)}
          placeholder='新しいクエストを入力...'
          style={{ color: '#000', padding: '5px' }}
        />
        <button onClick={handleAddQuest} style={{ marginLeft: '5px' }}>追加</button>
      </div>

      {/* 🔄 クエスト一覧表示エリア（ここで初めて「map」を使います！） */}
      <ul style={{ marginTop: '20px' }}>
        {/* ② 配列の中身をループして画面に<li>として出力する、JavaScriptの「配列用のメソッド名」は何？ */}
        {quests.map((quest) => (
        <li key={quest.id} style={{margin: '5px 0'}}>
          <input type="checkbox" checked={quest.isCompleted} readOnly />
          <span style={{ marginLeft: '10px'}}>{quest.text}</span>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
