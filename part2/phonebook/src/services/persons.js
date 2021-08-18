import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const erase = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const replace = (newObject, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
}

const services = { getAll, create, erase, replace }

export default services