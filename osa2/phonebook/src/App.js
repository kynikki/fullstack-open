import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])     
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationColor, setNotificationColor] = useState(null)

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
        setNotification(`Added ${newName}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)

    }
    else {
      // Person is already added to phonebook. Ask for confirmation if the user wants to update the number.
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old
      number with a new one?`)) {
        const changedPerson = { ...found, number: newNumber}
        console.log(found.id, changedPerson)        
        personService
          .update(found.id, changedPerson)
          .then(response => {
            console.log('updating')
          })
          // Person has been already removed from server
          .catch(error => {            
            setNotificationColor("red")
            setNotification(`Information of ${personObject.name} has already been removed from server`)
            setNewName('')
            setNewNumber('')

            setPersons(persons.filter(person => person.id !== found.id))
          })                     
          setNotification(`Updated ${personObject.name}`)
          setTimeout(() => {
          setNotification(null)
          }, 5000)
          
          setNewName('')
          setNewNumber('')           
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
      if (window.confirm(`Poistetaanko ${name}?`)) {
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(n => n.id !== id))            
            setNewName("")
            setNewNumber("")
          })
          .catch(error => {
            setPersons(persons.filter(n => n.name !== name))            
          })        
        setNotification(`Deleted ${name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)                
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} color={notificationColor}/>
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