import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import './App.css';
import GetReportlist from './components/getReportlist';
import Login from './components/login';
import ReportVersion from './components/ReportVersion';
import UploadFiles from './components/UploadFiles';

function App() {

  let [Token, setToken] = useState('');
  let [IsAdmin, setIsAdmin] = useState(false)
  let [Reportname, setReportname] = useState('')

  let userLogin = (tok) => {
    setToken(tok);
  }

  let getReportName = (repname, is_admin) =>{
    setReportname(repname);
    setIsAdmin(is_admin)
    console.log('reportnameapp = ', Reportname )
    console.log('isadminmain=', IsAdmin)
  }
  

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<div className="Appp"><Login userLogin={userLogin}/></div>}></Route>
        {console.log('RouterToken=',Token)}
        <Route path = "/reportlist" element = {<GetReportlist Token={Token} getReportName={getReportName}/>}/>
        <Route path = "/ReportVersion" element = {<ReportVersion Token={Token} Reportname={Reportname} IsAdmin = {IsAdmin}/>}/>
        <Route path = "/UploadFiles" element = {<UploadFiles Token = {Token} Reportname={Reportname} IsAdmin = {IsAdmin}/>}/>
      </Routes>
    </Router>



    // <div className="App">
    //   <Login userLogin={userLogin}/>
    //   {/* <GetReportList token={token}/> */}
    // </div>
  );
}

export default App;
