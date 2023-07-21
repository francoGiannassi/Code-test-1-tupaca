import { useState } from 'react'
import TaskBoard from './components/TaskBoard';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <TaskBoard />
      </div>
    </>
  )
}

export default App
