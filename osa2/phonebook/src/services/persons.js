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

const remove = (id) => {    
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)   
}

const update = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person)
    return request.then(response => response)
}

export default { getPersons, create, remove, update }