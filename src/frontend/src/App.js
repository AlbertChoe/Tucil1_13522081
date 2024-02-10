import './App.css';
import Form from './component/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './component/FileUpload';
import Navbar from './component/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/upload" element={<FileUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
