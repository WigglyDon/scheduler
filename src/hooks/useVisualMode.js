import { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(value) {
    setHistory([ ...history, value ]);
  }

  function back() {
    if (history.length > 1) {
      const historyCopy = [...history]
      historyCopy.pop()
      setHistory(historyCopy)
    }
  }

  useEffect(() => {
    console.log("999 x grapes", mode, history[history.length - 1])
    setMode(history[history.length - 1])
  }, [history])

  return { mode, transition, back };
}
