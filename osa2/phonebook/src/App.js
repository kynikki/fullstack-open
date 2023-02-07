import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])     
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    personService
      .getPersons()
      .then(persons => {
        setPersons(persons)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
  
    const personObject = {
      name: newName,
      number: newNumber
    }

    const found = (persons.find(person => person.name === personObject.name))
    // If person doesn't exist in phonebook yet, person will be added.
    if (found === undefined) {
       
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

    }
    else {
      // Person is already added to phonebook. Ask for confirmation if the user wants to update the number.
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old
      number with a new one?`)) {
        const changedPerson = { ...found, number: newNumber}        
        personService
          .update(found.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== found.id ? person : response.data))
          })
      }
    }    
  } 

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {    
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)    
  }  
  const handleDeletePerson = (name, id) => {
    return () => {
      if (window.confirm(`Poistetaanko ${name} ?`)) {
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(n => n.id !== id));            
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            setPersons(persons.filter(n => n.name !== name));            
          }
        )        
      }
    }
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
      <Persons persons={persons} newFilter={newFilter} handleDeletePerson={handleDeletePerson} />     
    </div>
  )

}

export default App