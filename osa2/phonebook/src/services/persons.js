import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const remove = (person) => {    
    const request = axios.delete(`${baseUrl}/${person.id}`)
    console.log('henkilö poistettiin')
    return request.then(response => response.data)   
}

export default { getPersons, create, remove }