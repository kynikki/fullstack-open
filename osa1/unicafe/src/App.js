import { useState } from 'react'

const Button = (props) => {
  return (  
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )  
}

const StatisticsLine = ({ text, value }) => {

  if (text == 'positive')
    return (
      <div> {text} {value} %</div>
    )
  
  return (
    <div> {text} {value}</div>
  )
}

const Statistics = ({ good, neutral, bad}) => {

  const total = good + neutral + bad;
    
  if (good === 0 && neutral === 0 && bad === 0) 
    return (
      <p>No feedback given</p>
    )
  
  return (
    <div>      
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={total} />
      <StatisticsLine text='average' value={((good * 1) + (bad * -1))/total} />
      <StatisticsLine text='positive' value={((good/total) * 100)} />
    </div>
  )
}
  

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral}
      bad={bad} />

    </div>
  )
}

export default App
