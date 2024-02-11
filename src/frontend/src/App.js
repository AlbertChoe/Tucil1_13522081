import './App.css';
import Form from './component/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './component/FileUpload';
import Navbar from './component/Navbar';
import AutoForm from './component/AutoForm';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/auto" element={<AutoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
