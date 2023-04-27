import { useState } from "react";

function App() {
  const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
      setValue(event.target.value);
    };

    return {
      type,
      value,
      onChange,
    };
  };

  const name = useField("text");

  return (
    <div>
      <form>
        <input {...name} />
      </form>
    </div>
  );
}

export default App;
