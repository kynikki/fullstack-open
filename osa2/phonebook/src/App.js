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
    if (found === undefined) {
       
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })

    }
    else {
      window.alert(`${personObject.name} is already added to phonebook`)
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