import styles from './QuestList.module.css';

function QuestList({ quests, handleCompleteQuest, handleDeleteQuest }) {
  return (
    <ul className={styles.container}>
      {/* ② 配列の中身をループして画面に<li>として出力する、JavaScriptの「配列用のメソッド名」は何？ */}
      {quests.map((quest) => (
        <li
          key={quest.id}
          className={styles.list}>

          {/* 1. チェックボックス */}
          <input
            type="checkbox"
            checked={quest.isCompleted}
            // disabled属性は真偽値としてtrueならロック,falseなら解除というルールがあるからこのコードでいい
            disabled={quest.isCompleted}
            onChange={() => handleCompleteQuest(quest.id)}
          />

          {/* 2. クエストのテキスト表示エリア */}
          <span
            className={`${styles.quest} ${quest.isCompleted ?  styles.questChecked : ''}`}>
            {!quest.isCompleted ? '▶ ' : ' '}
            {quest.text}
          </span>

          {/* 3. 削除用のボタン（テキストコマンド風に大改造！） */}
          <button onClick={() => {
            if (confirm('経験値が欲しくないんか！')) {
              handleDeleteQuest(quest.id);
            }
          }}
           className={styles.delete}
          >
            ▶ 逃げる
          </button>
        </li>
      ))}
    </ul>
  );
}
export default QuestList;





