import axios from 'axios'
const countriesApi = 'https://restcountries.eu/rest/v2/all'

const getAll = () => {
    return axios.get(countriesApi)
}

const exported = {getAll}
export default exported