import { useState } from 'react'

const Person = (props) => {     
  return (
      <li>{props.name} {props.number}</li>
  )
}

const Persons = (props) => {
  
  return (
    <ul>
            {props.persons.filter(person => person.name.toUpperCase().includes(props.newFilter.toUpperCase())).map(person => (
            <Person key={person.name} name={person.name} number={person.number} /> ))}
        </ul>  
  )
}

const Filter = (props) => {
  return (
    <div>
          filter shown with:
          <input 
            value={props.newFilter}
            onChange={props.handleFilterChange}/>
    </div>
  )
}

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '050-5587524'
    },
    {
      name: 'Atte Marttinen',
      number: '0500585281'
    },
    {
      name: 'Heikki Silvennoinen',
      number: '1235675454'
    }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  



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
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />      
      <h2>Add a new contact</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />       
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />     
    </div>
  )

}

export default App