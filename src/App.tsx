import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Details from "./components/Details"
import UserForm from "./components/UserForm"
import About from "./components/About"

function App() {
  return (
    <Router>
      <div className="font-mono bg-green-700 text-green-500 h-screen p-4">
        <div className="w-full bg-black h-full rounded-4xl flex justify-center items-center overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="/details" element={<Details />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
