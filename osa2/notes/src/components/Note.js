const Note = ({ note, toggleImportance, handleNoteDelete }) => {
  const label = note.important
    ? 'make not important' : 'make important'
  
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={handleNoteDelete()}>delete</button>
    </li>
  )
}

export default Note

