import React, { useState } from 'react'

const Button = (props) => {
    const { onClick, text} = props
    return (
	<button onClick={onClick}>
	  {text}
	</button>
    )	  
}

const Display = (props) => {
    const { votes } = props
    return (
	<div> has {votes} votes </div>
    )
}

const MostVotes = (props) => {
    const { votes, text } = props
    if (votes > 0) {
	return (
	    <>
	      <h1> Anecdote with most votes</h1>
	      <div> {text} </div>
	      <div> has {votes} votes </div>
	    </>
	)
    }

    return (
	<h1> No votes have been cast </h1>
    )
}

const App = () => {
    const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
    const [selected, setSelected] = useState(0)
    const [vote, setVote] = useState(0)
    const [points, setPoints] = useState (
	new Array(anecdotes.length).fill(0)
    )

    const pickAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
    const Vote = () => {
	setVote(vote + 1)
	const cpoints = [...points]
	cpoints[selected] += 1 
	setPoints(cpoints)
    }

    let index
    for (let i = 0; i < anecdotes.length; i++) {
	if (points[i] === Math.max(...points)) {
	    index = i
	}
    }

    return (
	<div>
	    <h1> Anecdote of the day </h1>
	    {anecdotes[selected]}
	    <Display votes={points[selected]} />
	    <div>
		<Button onClick={Vote} text='vote' />
		<Button onClick={pickAnecdote} text='next anecdote' />
	    </div>
	    <MostVotes votes={points[index]} text={anecdotes[index]} />
	</div>
    )
}

export default App;
