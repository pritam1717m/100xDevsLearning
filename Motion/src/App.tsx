import "./App.css";
import { motion } from "motion/react"

function App() {
  return (
    <>
      <motion.div
        className="w-30 h-40 bg-amber-800"
        animate={{
          x : 1000,
          scale : 2,
          rotate: 720
        }}
        transition={{
          duration: 3
        }}
      />
    </>
  );
}

export default App;
