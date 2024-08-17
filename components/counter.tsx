// components/Counter.tsx

import { useState } from "react";

// Define the props type, specifying that onCountChange is a function that takes a number
interface CounterProps {
  onCountChange: (count: number) => void;
  odai:number;
}

const Counter: React.FC<CounterProps> = ({ onCountChange,odai }) => {
 
  const [count, setCount] = useState(odai);
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange(newCount); // Pass updated count to parent
  };

  const decrement = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
    onCountChange(newCount); // Pass updated count to parent
  };

  return (
    <div className="flex items-center justify-start space-x-4 py-5">
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={decrement}
      >
        -
      </button>
      <span className="text-2xl font-semibold">{count}</span>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
