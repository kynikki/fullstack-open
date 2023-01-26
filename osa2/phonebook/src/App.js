import { useState } from 'react'

const Note = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '050-5587524'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
  
    const noteObject = {
      name: newName,
      number: newNumber
    }

    const found = (persons.find(person => person.name === noteObject.name))
    if (found === undefined) {
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      window.alert(`${noteObject.name} is already added to phonebook`)
    }    
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Note key={person.name} person={person} />
        )}
      </ul>
    </div>
  )

}

export default App