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

const services = { getAll, create, erase }

export default services