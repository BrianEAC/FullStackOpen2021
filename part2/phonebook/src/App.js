import React, { useState } from 'react'

const Search = ({ name, change }) => {
  return (
    <>
      <h3>Search</h3>
      <input
        value={name}
        onChange={change} />
    </>
  )
}

const PersonForm = ({ submit, nameValue, nameChange, numberValue, numberChange }) => {
  return (
    <>
      <h3>Add new</h3>
      <form onSubmit={submit}>
        <div>
          name: <input
            value={nameValue}
            onChange={nameChange} />
        </div>
        <div>number: <input
          value={numberValue}
          onChange={numberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({persons}) => {
  return (
    <>
    <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.number}>{person.name} : {person.number}</li>)}
      </ul>
      </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [searchName, setSearchName] = useState()
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const addPerson = (e) => {
    e.preventDefault()
    if (persons.find(person => person.name === newName) !== undefined || persons.find(person => person.number ===newNumber)!== undefined) {
      alert(`${newName} already exists in phonebook`)
    }
    else {
      const personObject = { name: newName, number: newNumber }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const nameChange = (e) => {
    setNewName(e.target.value)
  }


  const numberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const searchChange = (e) => {
    setSearchName(e.target.value)
  }

  const filterPersons = (persons, search) => {
    if (!search) {
      return persons
    }
    return persons.filter(person => {
      const personName = person.name.toLowerCase()
      return personName.includes(search)
    })
  }

  const filteredPersons = filterPersons(persons, searchName)

  return (
    <div>
      <h2>Phonebook</h2>
      <Search name={searchName} change={searchChange} />
      <PersonForm submit={addPerson} nameValue={newName} nameChange={nameChange} numberValue={newNumber} numberChange={numberChange}/>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App