import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Landpage from "./pages/LandPage/Landpage";
import Footer from './GeralComponents/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landpage />}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App
