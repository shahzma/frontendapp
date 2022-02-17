import React, { useState } from 'react';
// import '../App.css';
import {Navigate} from 'react-router-dom';
import Header from './header';


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

    // if(!props.IsAdmin){
    //   return <Navigate to = '/'/>
    // }

  return (
    <div>
      <Header/>
      <h2 style={{textAlign:'center', marginTop:'20px'}}>Upload Your Files Here</h2>
      {/* <div className="App">
        <br/>
        <h1>Upload your files here</h1>
        <br/>
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
      </div> */}
      <div className='uploadContainer'>
            <form>
                <div className="form-group">
                    <label>Report Version</label>
                    <input type = 'text' name = 'report' id='report' className="form-control" value={reportversionname} onChange={(evt) => setReportversionname(evt.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Select file</label>
                    <input type = 'file' name = 'file' id='file' className="form-control" onChange={(evt) => setFile(evt.target.files[0])}/>
                </div>
            </form>
            <button onClick={() => newFile()} className="btn btn-primary btn-block" >Submit</button>
      </div>
    </div>
    
  )
}

export default UploadFiles