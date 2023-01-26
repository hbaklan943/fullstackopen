import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);

  const setToZero = () => {
    setCounter(0);
    console.log("resetting to zero, value before", counter);
  };
  const increaseByOne = () => {
    setCounter(counter + 1);
    console.log("increasing, value before", counter);
  };
  const decreaseByOne = () => {
    setCounter(counter - 1);
    console.log("decreasing, value before", counter);
  };

  return (
    <>
      <p>ubuntuuu</p>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text={"Increase"}></Button>
      <Button onClick={decreaseByOne} text={"decrease"}></Button>
      <Button onClick={setToZero} text={"zero"}></Button>
    </>
  );
};

const Display = ({ counter }) => <>{counter}</>;

const Button = ({ onClick, text }) => (
  <>
    <button onClick={onClick}>{text}</button>
  </>
);

export default App;
