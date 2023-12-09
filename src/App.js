import { useState } from 'react';
import TextForm from './components/TextForm';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from './components/Alert';
// import Something from './components/Something';


function App() {
  const [mode, setmode] = useState("light");
  const [alert,setAlert] = useState(null);
  const handleAlert = (message, type)=>{
    setAlert({
      msg:message,
      type: type
      // type: messageColor {ye aesy bhi declare hosakta hy}
    })

    setTimeout(()=>{
      setAlert(null);
    },3000)
  }
  

  const toggleMode = ()=>{
    if(mode ==="light"){
      setmode("dark");
      document.body.style.backgroundColor="#182d42";
      handleAlert("Dark Mode Enabled","success");
    }
    else{
      setmode("light");
      document.body.style.backgroundColor="#efefef";
      handleAlert("Light Mode mode Enabled","success");

    }
  }
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route exact path="/" element={<><Navbar mode={mode} toggleMode = {toggleMode} handleAlert = {handleAlert}/> <Alert alert={alert} />   <TextForm mode={mode} handleAlert = {handleAlert}/>   </>} />
    </Routes>
    </Router>
  </div>
    
    
    
  );
}

export default App;
