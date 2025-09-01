import Header from "./components/Header"
import About from "./components/About"
import Experience from "./components/Experience"
import Education from "./components/Education"
import Skills from "./components/Skills"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <Header />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Footer />
    </div>
  )
}

export default App
