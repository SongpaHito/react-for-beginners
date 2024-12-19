// import Button from "./Button";

//import { useEffect, useState } from "react";

// function App() {
//   return (
//     <div>
//       <h1>Welcome back!!</h1>
//       <Button text={"continue"}/>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from "react";

// // function App() {
// //   const [count, setCount] = useState(0);
// //   const [keyword, setKeyword] = useState("");
// //   const onClick = () => setCount((prev) => prev + 1);
// //   const onChange = (event) => setKeyword(event.target.value);
// //   useEffect ( () => {
// //     console.log("I run only once.");
// //   }, []);
// //   //useEffect (() => {
// //   //  if (keyword !== "" && keyword.length > 5) {
// //   //  console.log("SEARCH FOR", keyword);
// //   //}
// //   //}, [keyword]);
// //   useEffect (() => {
// //     console.log("I run when 'keyword' changes");
// //     }, [keyword]);
// //   useEffect (() => {
// //     console.log("I run when 'count' changes");
// //     }, [count]);
// //     useEffect (() => {
// //     console.log("I run when 'keyword & counter' changes");
// //      }, [keyword, count]);
// //   return (
// //     <div>
// //       <input value={keyword} onChange={onChange} type="text" placeholder="Search here!"/>
// //       <h1>Counter: {count}</h1>
// //       <button onClick={onClick}>Click Me!</button>
// //     </div>
// //   );
// // }

// export default App;

// import { useState, useEffect } from "react";

// function Hello() {
//   useEffect(() => {
//     console.log("Hi!");
//     return () => console.log("ByeBye!");
//   }, []);
//   useEffect(function () {
//     console.log("Hi!");
//     return function () {
//       console.log("ByeBye!");
//     };
//   }, []);
//   return <h1>Hello</h1>;
// }

// function App() {
//   const [showing, setShowing] = useState(false);
//   const onClick = () => setShowing((prev) => !prev);
//   return (
//     <div>
//       {showing ? <Hello /> : null}
//       <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }

    const now = new Date().toISOString();

    // 새 항목 추가
    const newToDo = { task: toDo, time: now };

    setToDos((currentArray) => [newToDo, ...currentArray]);
    setToDo("");
  };

  const sortedToDos = [...toDos].sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );

  return (
    <div>
      <h1>My To Do ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do"
        />
        <button>Add to Do</button>
      </form>
      <hr />
      <ul>
        {sortedToDos.map((item, index) => (
          <li key={index}>
            {item.task} - <span>{new Date(item.time).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
