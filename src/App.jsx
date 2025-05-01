import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landpage from "./pages/LandPage/Landpage";
import Footer from './GeralComponents/Footer/Footer';
import NavBar from './GeralComponents/NavBar/NavBar';
import Chat from './GeralComponents/Chat/Chat';
import ModalAoVivo from './GeralComponents/ModalAoVivo/ModalAoVivo';

function App() {

  return (
    <>
      <ModalAoVivo />
      <NavBar />
      <Chat />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landpage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App
