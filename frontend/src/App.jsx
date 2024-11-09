import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [loadedTodos, setLoadedTodos] = useState([]);
  const [data, setData] = useState({ todos: [], nextPage: "" });
  const [next, setNext] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadingRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3000/todos?size=3${next && `&page=${next}`}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.next) {
          return;
        }
        setLoadedTodos((prevTodos) => [...prevTodos, ...data.todos]);
        setData({ todos: data.todos, nextPage: data.next });
        setIsLoading(false);
      });
  }, [next]);

  const loadMoreTodos = () => {
    setNext(data.nextPage);
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  useEffect(() => {
    if (loadedTodos.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log("entry", entry.target);
        loadMoreTodos();
      }
    }, options);

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loadingRef, loadMoreTodos]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>helo</h1>
      {!isLoading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {loadedTodos.map((todo) => {
            return (
              <div
                key={todo._id}
                style={{
                  border: "1px solid black",
                  padding: "1rem",
                  height: "300px",
                }}
              >
                <h2>{todo.title}</h2>
                <button>Complete</button>
              </div>
            );
          })}
        </div>
      )}
      <div ref={loadingRef}>{!isLoading && "Loading..."}</div>
      {/* {data.nextPage && (
        <button onClick={loadMoreTodos}>Load more todos</button>
      )} */}
    </div>
  );
}

export default App;
