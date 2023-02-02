const PersonForm = (props) => {
    return (
      <form onSubmit={props.addPerson}>
        <div>
          name: 
          <input 
          value={props.newName}
          onChange={props.handlePersonChange}/>
        </div>
        <div>
          number: 
          <input
          value={props.newNumber}
          onChange={props.handleNumberChange}/>
        </div>        
          <button type="submit">add</button>
      </form>
    )
}
export default PersonForm