import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import logotipo from '/logo.png'
import './App.css'


//components

import App1 from './components/InputComponent/InputComponent'

function App() {
  return (
    <>
      <div>
        <a href="/" target="_blank">
      
          <img src={logotipo} className="logo" alt="Vite logo" />

        </a>
        
        <App1/>
        


      </div>





      <div className="card">
        <p>Desarrollado por Antonio Queb</p>
      </div>
    </>
  )
}

export default App
