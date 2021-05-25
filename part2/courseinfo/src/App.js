import React from 'react'

const Header = ({ course }) => {
  return (
    <div>
      <h1> {course.name} </h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => 
	<Part part={part} key={part.id} />
      )}
    </div>
  )
}

const Total = ({ course }) => {
  //const exercises = course.parts.map(part => part.exercises)
  const sum = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0) 
  return (
    <p>Number of exercises {sum}</p> 
  )
}
    
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
	name: 'Fundamentals of React',
	exercises: 10,
	id: 1 
      },
      {
	name:'Using to pass data',
	exercises: 7,
	id: 2
      },
      {
	name: 'State of a component',
	exercises: 14,
	id: 3
      },
      {
	name: 'Redux',
	exercises: 11,
	id: 4
      }
    ]
  }

  return <Course course={course} /> 
}

export default App