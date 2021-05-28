import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <>
        <h1 key={course.id}>{course.name}</h1>
      </>
    )
  }
  
  const Content = ({ course }) => {
    return (
      course.parts.map(part => <Part key={part.id} part={part} />)
    )
  }
  
  const Part = ({ part }) => {
    return (
      <p key={part.id}>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({course}) => {
    const total = course.parts.reduce((x,y) => x + y.exercises, 0) 
    return (
      <p key='0'>Total of exercises: {total}</p>
    )
  }

  export default Course