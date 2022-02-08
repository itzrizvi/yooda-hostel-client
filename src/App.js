import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddFood from './Pages/AddFood/AddFood';
import AddStudent from './Pages/AddStudent/AddStudent';
import DistributeFood from './Pages/DistributeFood/DistributeFood';
import EditDeleteFood from './Pages/EditDeleteFood/EditDeleteFood';
import EditDeleteStudent from './Pages/EditDeleteStudent/EditDeleteStudent';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addfood" element={<AddFood />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/editdeletefood" element={<EditDeleteFood />} />
          <Route path="/editdeletestudent" element={<EditDeleteStudent />} />
          <Route path="/distributefood" element={<DistributeFood />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
