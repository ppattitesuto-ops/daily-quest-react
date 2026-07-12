import { useState, useEffect } from 'react';
import Header from './Header';
import QuestForm from './QuestForm';
import QuestList from './QuestList';
import styles from './App.module.css';

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
        alert("自動検知:もう25歳、今までの敗北の歴史を変えるんじゃないのか？");
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
    <div className={`${styles.container} ${isCurseActive ? styles.curseActive : ''}`}>
      
      {/* 📚ヘッダー部分 */}
      <h1 className={styles.title}>Daily Quest (React版)</h1>
      {/* ⭕ Reactの『宣言的UI』：{} で囲むだけで、データが画面に自動連動する */}
      <Header level={level} xp={xp} neededXp={neededXp} />
      <button onClick={() => handleGainXp('1')}>経験値+10</button>
      <button onClick={() => {
        const testCurseTime = Date.now() + 604800000;
        setCurseUntil(testCurseTime);
        alert("テスト")
      }}
        style={{
          marginLeft: '10px',
          backgroundColor: 'purple',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          padding: '10px'
        }}
      >強制呪い発動</button>

      {/* 🛠️ クエスト追加エリア */}
      <QuestForm inputText={inputText} setInputText={setInputText} difficulty={difficulty} setDifficulty={setDifficulty} handleAddQuest={handleAddQuest} />

      {/* 🔄 クエスト一覧表示エリア */}
      <QuestList quests={quests} handleCompleteQuest={handleCompleteQuest} handleDeleteQuest={handleDeleteQuest} />
    </div>
  );
}

export default App;