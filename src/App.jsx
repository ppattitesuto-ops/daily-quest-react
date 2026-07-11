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
  // レベルアップに必要なXPを計算（現在のレベル * 100）
  const neededXp = level * 100;

  // ★★★ローカルストレージに保存と読み込む処理は正常に動いていたが、「level,xp,quests」のuseStateの初期値に１や[]をセットしていたことで、画面更新の際に初めにその初期値が読み込まれることによって、結果として画面を更新しても前回の内容が今回の内容に引き継がれないバグが起こっていた。→useStateの初期値の時点でlocalStorageからデータを読み込むようにコードを変えることで解決。結果処理１の自動読み込みの下のコードはいらなくなった。
  // 💾 処理1：【自動読み込み】アプリ起動時に1回だけ、過去のデータを復元する
  // useEffect(() => {
  //   const localLevel = localStorage.getItem('level');
  //   const localXp = localStorage.getItem('xp');
  //   const localQuests = localStorage.getItem('quests');

  //   if (localLevel) setLevel(Number(localLevel));
  //   if (localXp) setXp(Number(localXp));
  //   if (localQuests) setQuests(JSON.parse(localQuests));
  // }, []);

  // 💾 処理2：【自動保存】データが変わるたびに、自動でlocalStorageに書き込む
  // ② level や xp が変わった瞬間を検知して、自動で保存する
  useEffect(() => {
    localStorage.setItem('level', level);
    localStorage.setItem('xp', xp);
  }, [level, xp]); // 💡 [ ] の中に監視したい変数を並べると、それが変わった時にだけ動きます！

  // ③ quests（タスク一覧）が変わった瞬間を検知して、自動で保存する
  useEffect(() => {
    console.log("★今、questsが変更されたので保存します！", quests);
    localStorage.setItem('quests', JSON.stringify(quests));
  }, [quests]);

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

  // 要素の追加処理
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

  // クエスト達成時の処理
  const handleCompleteQuest = (id) => {
    const updatedQuests = quests.map((quest) => {
      if (quest.id === id) {
        return { ...quest, isCompleted: true };
      }
      return quest;
    });
    setQuests(updatedQuests);
    handleGainXp();
  };

  // クエストを削除する処理
  const handleDeleteQuest = (id) => {
    const filteredQuests = quests.filter((quest) => {
      return quest.id !== id;
    });
    setQuests(filteredQuests);
  }

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
              if(confirm('Sure')) {
                handleDeleteQuest(quest.id);
              }
            }}
            style={{marginLeft:'10px', color:'red', cursor:'pointer', background: 'none', border:'none'}}
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
