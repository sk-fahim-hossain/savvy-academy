import { Outlet } from 'react-router-dom'
import './App.css'
import Container from './component/Container'
import Navbar from './component/Navbar'
import Main from './layout/Main'
import Footer from './component/Footer'

function App() {

  return (
    <div>
      <div className='w-full bg-slate-50'>
        <Container>
          <Navbar/>
        </Container>
      </div>
      <Container>
        <Outlet></Outlet>
        <Footer></Footer>
      </Container>
    </div>
  )
}

export default App
