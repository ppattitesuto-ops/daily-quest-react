function QuestList({ quests, handleCompleteQuest, handleDeleteQuest }) {
  return (
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
  );
}
export default QuestList;
