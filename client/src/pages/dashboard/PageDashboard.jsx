import { useState } from "react";

export function PageDashboard() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  function handlePlusClick() {
    setCount((prevCount) => prevCount + 1);
    setHistory((prevHistory) => [count + 1, ...prevHistory]);
  }

  function handleMinusClick() {
    setCount((prevCount) => prevCount - 1);
    setHistory((prevHistory) => [count - 1, ...prevHistory]);
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="col-12">ACCOUNT DASHBOARD PAGE CONTENT</h1>
      </div>
      <div className="row">
        <div className="col-12">
          <button onClick={handlePlusClick}>Plus</button>
          <div>{count}</div>
          <button onClick={handleMinusClick}>Minus</button>
        </div>
        <ul>
          {history.map((n, index) => (
            <li key={index}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
