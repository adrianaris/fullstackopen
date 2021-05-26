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
    <h4>Number of exercises {sum}</h4> 
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

export default Course
