import styles from './QuestForm.module.css';

function QuestForm({ inputText, setInputText, difficulty, setDifficulty, handleAddQuest }) {
  return (
    <div className={styles.container}>

      {/* 📝 クエスト内容入力欄 */}
      <div>
        <label className={styles.label}>▶クエストを入力</label>
        <input
          type='text'
          value={inputText}
          /* 入力された文字をリアルタイムで変数inputTextに同期させるReactの必須コード */
          onChange={(e) => setInputText(e.target.value)}
          placeholder='新しいクエストを入力...'
          className={styles.text}
        />
      </div>

      <div>
        <label className={styles.label}>▶難易度を選択</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className={styles.select}
        >
          <option value="1">難易度1 (10XP)</option>
          <option value="2">難易度2 (30XP)</option>
          <option value="3">難易度3 (50XP)</option>
        </select>
        <button
          onClick={handleAddQuest}
          className={styles.addBtn}>
          ⚔ 決定
        </button>
      </div>
    </div>
  )
}

export default QuestForm;