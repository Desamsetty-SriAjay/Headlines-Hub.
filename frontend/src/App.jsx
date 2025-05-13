import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Header from './components/Header';


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element={<Notes />} />
      </Routes>
    </div>
  );
};

export default App;
