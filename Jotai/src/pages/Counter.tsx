import { useAtom, useAtomValue } from "jotai";
import { counterAtom, doubleCounterAtom } from "../store/atom/atom";

export default function Counter() {
  const [count, setCount] = useAtom(counterAtom);
  const doubleCount = useAtomValue(doubleCounterAtom)
  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <h2>Doubled Count is {doubleCount}</h2>
    </div>
  );
}
