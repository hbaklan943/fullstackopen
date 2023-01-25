const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <>
      <Part
        partName={props.parts[0].name}
        exerciseCount={props.parts[0].exercises}
      />
      <Part
        partName={props.parts[1].name}
        exerciseCount={props.parts[1].exercises}
      />
      <Part
        partName={props.parts[2].name}
        exerciseCount={props.parts[2].exercises}
      />
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        number of exercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.partName} {props.exerciseCount}
      </p>
    </>
  );
};

export default App;
