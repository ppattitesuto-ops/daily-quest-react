function QuestForm({ inputText, setInputText, difficulty, setDifficulty, handleAddQuest }) {
  return (
    <div style={{
      margin: '20px auto',
      backgroundColor: '#000000',
      border: '3px double #ffffff',
      borderRadius: '0px',
      padding: '20px',
      fontFamily: '"DotGothic16", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      maxWidth: '300px',
    }}>

      {/* 📝 クエスト内容入力欄 */}
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>▶クエストを入力</label>
        <input
          type='text'
          value={inputText}
          /* 入力された文字をリアルタイムで変数inputTextに同期させるReactの必須コード */
          onChange={(e) => setInputText(e.target.value)}
          placeholder='新しいクエストを入力...'
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            border: '1px solid #ffffff',
            padding: '8px',
            fontFamily: '"DotGothic16", sans-serif',
            width: '240px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>▶難易度を選択</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            border: '1px solid #ffffff',
            padding: '8px',
            fontFamily: '"DotGothic16", sans-serif',
            width: '240px',
            boxSizing: 'border-box'
          }}
        >
          <option value="1">難易度1 (10XP)</option>
          <option value="2">難易度2 (30XP)</option>
          <option value="3">難易度3 (50XP)</option>
        </select>
        <button
          onClick={handleAddQuest}
          style={{
            display: 'block',
            backgroundColor: '#000000',
            color: '#ffffff',
            border: 'none',
            padding: '10px 0',
            cursor: 'pointer',
            fontFamily: '"DotGothic16", sans-serif',
            fontSize: '16px',
            width:'240px',
            textAlign:'left',
            paddingLeft:'15px',
            marginTop:'8px'
          }}>
          ⚔ 決定
        </button>
      </div>
    </div>
  )
}

export default QuestForm;