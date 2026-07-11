import { useState, useEffect } from 'react';

function App() {
  // 【ReactのState定義】
  // [現在の値, 値を更新するための専用の関数] = useState(初期値);
  const [level, setLevel] = useState(() => Number(localStorage.getItem('level')) || 1);
  const [xp, setXp] = useState(() => Number(localStorage.getItem('xp')) || 0);
  // 【追記】空の配列（ [] ）を初期値として、questsという状態を作る
  const [quests, setQuests] = useState(() => {
    const local = localStorage.getItem('quests');
    return local ? JSON.parse(local) : [];
  });
  const [inputText, setInputText] = useState('');
  const [difficulty, setDifficulty] = useState('1');
  const [curseUntil, setCurseUntil] = useState(() => Number(localStorage.getItem('curseUntil')) || 0);
  const [lastCheckedDate, setLastCheckedDate] = useState(() => localStorage.getItem('lastCheckedDate') || '');

  // レベルアップに必要なXPを計算（現在のレベル * 100）
  const neededXp = level * 100;

  // 💾 処理2：【自動保存】データが変わるたびに、自動でlocalStorageに書き込む
  // ② level や xp が変わった瞬間を検知して、自動で保存する
  useEffect(() => {
    localStorage.setItem('level', level);
    localStorage.setItem('xp', xp);
    localStorage.setItem('curseUntil', curseUntil);
  }, [level, xp, curseUntil]); // 💡 [ ] の中に監視したい変数を並べると、それが変わった時にだけ動きます！

  // ③ quests（タスク一覧）が変わった瞬間を検知して、自動で保存する
  useEffect(() => {
    console.log("★今、questsが変更されたので保存します！", quests);
    localStorage.setItem('quests', JSON.stringify(quests));
  }, [quests]);

  // ④アプリ起動時に毎回行われる呪い判定の処理
  useEffect(() => {
    const d = new Date();
    const todayStr = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    const now = Date.now();

    if (now < curseUntil) {
      console.log("あなたは呪われています...");
      localStorage.setItem('lastCheckedDate', todayStr);
      return;
    }
    if (lastCheckedDate !== todayStr && lastCheckedDate !== '') {
      const hasUncompletedQuest = quests.some((quest) => quest.isCompleted === false);
      if (hasUncompletedQuest) {
        const newCurseUntil = Date.now() + 604800000;
        setCurseUntil(newCurseUntil);
        alert("自動検知；もう25歳、今までの敗北の歴史を変えるんじゃないのか？");
      };
    };
    localStorage.setItem('lastCheckedDate', todayStr);
  }, []);

  // 経験値獲得の処理
  const handleGainXp = (amount) => {
    setXp((prevXp) => {
      let gainAmount = 0;
      if (Date.now() < curseUntil) {
        gainAmount = 10;
      } else {
        if (amount === '1') {
          gainAmount = 10;
        } else if (amount === '2') {
          gainAmount = 30;
        } else {
          gainAmount = 50;
        };
      };
      const nextXp = prevXp + gainAmount;
      if (nextXp >= level * 100) {
        setLevel(level + 1);
        return 0;
      } else {
        return nextXp;
      }
    })
  };

  // 要素の追加処理
  const handleAddQuest = () => {
    if (inputText.trim() === '') return;
    const newQuest = {
      id: Date.now(),
      text: inputText,
      isCompleted: false,
      difficulty: difficulty
    };
    setQuests([...quests, newQuest]);
    setInputText('');
  };

  // クエスト達成時の処理
  const handleCompleteQuest = (id) => {
    let targetDifficulty = '1';
    const updatedQuests = quests.map((quest) => {
      if (quest.id === id) {
        targetDifficulty = quest.difficulty;
        return { ...quest, isCompleted: true };
      }
      return quest;
    });
    setQuests(updatedQuests);
    handleGainXp(targetDifficulty);
  };

  // クエストを削除する処理
  const handleDeleteQuest = (id) => {
    const filteredQuests = quests.filter((quest) => {
      return quest.id !== id;
    });
    setQuests(filteredQuests);
  }

  const isCurseActive = Date.now() < curseUntil;

  return (
    <div style={{ padding: '20px', background: isCurseActive ?'#1a052e' : '#0d1117', 
    color: isCurseActive ? '#FF5555': '#c9d1d9', minHeight: '100vh' }}>
      <h1>Daily Quest (React版)</h1>
      {/* ⭕ Reactの『宣言的UI』：{} で囲むだけで、データが画面に自動連動する */}
      <div>現在のレベル: {level}</div>
      <div>現在のXP: {xp} / 次のレベルまで: {neededXp} XP</div>
      <button onClick={() => handleGainXp('1')}>経験値+10</button>

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

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ color: '#000', padding: '5px', marginLeft: '5px' }}
        >
          <option value="1">難易度1 (10XP)</option>
          <option value="2">難易度2 (30XP)</option>
          <option value="3">難易度3 (50XP)</option>
        </select>

        <button onClick={handleAddQuest} style={{ marginLeft: '5px' }}>追加</button>
      </div>

      {/* 🔄 クエスト一覧表示エリア（ここで初めて「map」を使います！） */}
      <ul style={{ marginTop: '20px' }}>
        {/* ② 配列の中身をループして画面に<li>として出力する、JavaScriptの「配列用のメソッド名」は何？ */}
        {quests.map((quest) => (
          <li key={quest.id} style={{ margin: '5px 0' }}>
            <input
              type="checkbox"
              checked={quest.isCompleted}
              // disabled属性は真偽値としてtrueならロック,falseなら解除というルールがあるからこのコードでいい
              disabled={quest.isCompleted}
              onChange={() => handleCompleteQuest(quest.id)}
            />
            <span style={{ marginLeft: '10px' }}>{quest.text}</span>
            <button onClick={() => {
              if (confirm('Sure')) {
                handleDeleteQuest(quest.id);
              }
            }}
              style={{ marginLeft: '10px', color: 'red', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
