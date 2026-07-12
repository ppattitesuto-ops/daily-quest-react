function QuestList({ quests, handleCompleteQuest, handleDeleteQuest }) {
  return (
    <ul style={{ marginTop: '20px'}}>
      {/* ② 配列の中身をループして画面に<li>として出力する、JavaScriptの「配列用のメソッド名」は何？ */}
      {quests.map((quest) => (
        <li
          key={quest.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '10px auto',
            fontFamily: '"DotGothic16", sans-serif',
          }}>

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
            style={{
              marginLeft: '10px',
              fontSize: '16px',
              textDecoration: quest.isCompleted ? 'line-through' : 'none',
              color: quest.isCompleted ? '#888888' : '#ffffff',
            }}>
            {!quest.isCompleted ? '▶ ' : ' '}
            {quest.text}
          </span>

          {/* 3. 削除用のボタン（テキストコマンド風に大改造！） */}
          <button onClick={() => {
            if (confirm('経験値が欲しくないんか！')) {
              handleDeleteQuest(quest.id);
            }
          }}
            style={{
              marginLeft: 'auto',
              color: '#ff5555',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              fontFamily:'"DotGothic16", sans-serif'
            }}
          >
            ▶ 逃げる
          </button>
        </li>
      ))}
    </ul>
  );
}
export default QuestList;





