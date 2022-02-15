import React, { useState } from 'react';
import '../App.css';
import {Navigate} from 'react-router-dom';


function UploadFiles(props) {
    // const [ reportname, setReportName ] = useState("");
    const [ reportversionname, setReportversionname ] = useState("");
    const [ file, setFile ] = useState();
  
    const newFile = () => {
        console.log(props.Token, props.Reportname)
      const uploadData = new FormData();
      uploadData.append('report', props.Reportname);
      uploadData.append('report_version_name', reportversionname);
      uploadData.append('file', file);
      
      fetch('http://127.0.0.1:8000/api/reportversion/', {
        method: 'POST',
        headers:{
            Authorization: `Token ${props.Token}`
        },
        body: uploadData
      })
      .then( res => console.log(res))
      .catch(error => console.log(error))
    }

    if(!props.Token){
      return <Navigate to = "/"/>
  }

    if(!props.IsAdmin){
      return <Navigate to = '/'/>
    }

  return (
    <div className="App">
       <br/>
      <h1>Upload your files here</h1>
      <br/>
      {/* <label>
        Report Name
        <input type="text" value={reportname} onChange={(evt) => setReportName(evt.target.value)}/>
      </label> */}
      <br/>
      <br/>
      <label>
        ReportVersion
        <input type="text" value={reportversionname} onChange={(evt) => setReportversionname(evt.target.value)}/>
      </label>
      <br/>
      <br/>
      <label>
        Select
        <input type="file" onChange={(evt) => setFile(evt.target.files[0])}/>
      </label>
      <br/>
      <br/>
      <button onClick={() => newFile()}>Upload</button>
    </div>
    
  )
}

export default UploadFiles