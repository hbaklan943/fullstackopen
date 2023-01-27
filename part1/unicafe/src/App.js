import { useState } from "react";

const StatisticLine = ({ value, text }) => {
  return (<p>{text} {value}</p>)
}

const Statistics = ({ good, bad, neutral, total }) => {
  return (
    <div>
      <StatisticLine text={"Good"} value={good} />
      <StatisticLine text={"Neutral"} value={neutral} />
      <StatisticLine text={"Bad"} value={bad} />
      <StatisticLine text={"Total Feedbacks"} value={total} />
      <StatisticLine text={"Avarage"} value={(good - bad) / (total)} />
      <StatisticLine text={"Positive %"} value={(good) / total * 100} />

    </div>
  )
}

const Button = ({ eventHandler, text }) => {
  return (
    <button onClick={eventHandler}>{text}</button>
  )

}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = (good + neutral + bad);

  if (good === 0 & bad === 0 & neutral === 0) {
    return (
      <div><h1>Give Feedback</h1>
        <Button eventHandler={() => setGood(good + 1)} text={"Good"} />
        <Button eventHandler={() => setNeutral(neutral + 1)} text={"Neutral"} />
        <Button eventHandler={() => setBad(bad + 1)} text={"Bad"} />
        <h2>Statistics</h2>No feedbacks given</div>)
  }
  return (

    <div>
      <h1>Give Feedback</h1>
      <Button eventHandler={() => setGood(good + 1)} text={"Good"} />
      <Button eventHandler={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <Button eventHandler={() => setBad(bad + 1)} text={"Bad"} />
      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />

    </div>
  )
}
export default App;