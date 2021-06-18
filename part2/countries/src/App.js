import React, { useEffect, useState } from 'react'
import countriesServices from './services/countriesServices'

const Countries = ({ countries }) => {
  if (countries.length <= 20 || countries.length > 1) {
    return (
      <div className="countryList">
        {countries.map(country => {
          return (
            <CountryListItems country={country} />
          )
        })
        }</div>
    )
  }
}

const CountryListItems = ({ country }) => {
  const [ infoShown, setInfoShown ] = useState(false)
 
  return (
    <div>
      <p key={country.id}>{country.name} <button key={country.id} onClick={() => setInfoShown(!infoShown)}>{infoShown ? 'hide' : 'show'} </button></p>
      {infoShown && <CountryInfo country={country} />}
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (<div className="countryInfo">
    <h1>{country.name}</h1>
    <h2>{country.nativeName}</h2>
    <img src={country.flag} alt='flag'></img>
    {country.languages.map(language => {
      return <li key={country.id}>{language.name}</li>
    })}
  </div>)
}

const Search = ({ name, change }) => {
  return (
    <div>
      <h3>Search</h3>
      <input
        value={name}
        onChange={change} />
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearch] = useState()

  const searchChange = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  const filterCountries = (countries, search) => {
    if (!search) return countries
    return countries.filter(country => {
      return country.name.toLowerCase().includes(searchCountry)
    })
  }

  const filteredCountries = filterCountries(countries, searchCountry)

  useEffect(() => {
    countriesServices
      .getAll()
      .then(response => setCountries(response.data))
  }, [])

  if (!searchCountry) {
    return (
      <div className="App">
        <Search name={searchCountry} change={searchChange} />
        <p>search for a country</p>
      </div>
    )
  }

  if (filteredCountries.length > 20) {
    return (
      <div className="App">
        <Search name={searchCountry} change={searchChange} />
        <p>too many matches</p>
      </div>
    )
  }

  if (filteredCountries.length === 1) {
    return (
      <div className="App">
        <Search name={searchCountry} change={searchChange} />
        <CountryInfo country={filteredCountries[0]} />
      </div>
    )
  }



  return (
    <div className="App">
      <Search name={searchCountry} change={searchChange} />
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
