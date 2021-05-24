import React, { useState } from 'react'

const Button = ({onClick, text}) => {
    return (
	<button onClick={onClick}>
	  {text}
	</button>
    )
}

const Statistic = ({text, value}) => {
    return (
	<tr> 
	  <td>{text}</td><td>{value}</td>
	</tr>
    )
}

const Statistics = (props) => {
    const { good, bad, neutral } = props
    if (good > 0 || bad > 0 || neutral > 0) {
	const all = good + bad + neutral
	const average = (good - bad) / all
	const positive = 100*good/all
        return (
	    <table>
	      <tbody>
		<Statistic text='good' value={good} />
		<Statistic text='neutral' value={neutral} />
		<Statistic text='bad' value={bad} />
		<Statistic text='all' value={all} />
		<Statistic text='average' value={average} />
	        <Statistic text='positive' value={positive + ' %'} />
	      </tbody>
	    </table>
	)
    }
    return null
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
	<div>
	<h1> give feedback </h1>
	  <Button onClick={() => setGood(good + 1)} text='good' />
	  <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
	  <Button onClick={() => setBad(bad + 1)} text='bad' />
	<h1> statistics </h1>
	  <Statistics good={good} bad={bad} neutral={neutral} /> 
	</div>
    )
}

export default App
