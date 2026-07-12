function QuestForm({inputText, setInputText, difficulty, setDifficulty, handleAddQuest}) {
  return (
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
  )
}

export default QuestForm;