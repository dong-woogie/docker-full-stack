import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [lists, setLists] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("/api/value", { value }).then((response) => {
      if (!response.data.success) {
        console.log(response.data.error);
        return alert("db에 값을 넣는데 실패했습니다.");
      }

      setLists([...lists, { value: response.data.value }]);
      setValue("");
    });
  };

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    axios.get("/api/values").then((response) => {
      if (!response.data.success) {
        console.log(response.data.error);
        return alert("db에서 값을 불러오지 못했습니다.");
      }

      setLists(response.data.results);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <ul className="list">
            {lists &&
              lists.map((list, index) => <li key={index}>{list.value}</li>)}
          </ul>
          <br />
          안녕하세요.
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인.</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
