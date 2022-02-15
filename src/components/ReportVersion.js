import React, { useState, useEffect } from 'react';
import {Link, Navigate} from 'react-router-dom';


function ReportVersion(props) {

    const [ ReportVersion, setReportVersion ] = useState([]);

    useEffect(()=>{
        console.log('useeffect');
        const encodedValue = encodeURIComponent(props.Reportname);
        fetch(`http://127.0.0.1:8000/api/reportversion/?report_name=${encodedValue}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${props.Token}`
        },
        // body: JSON.stringify({})
        })
        .then( data => data.json())
        .then(
        data => {
            setReportVersion(data)
        }
        )
        .catch( error => console.error(error))
    },[props.Reportname, props.Token]);


    let handleOnClick=()=>{
        console.log('going to upload')
    }

    let getFileOnClick=(fileAddress)=>{
        console.log('click')
        window.location.href=fileAddress
    }

    if(!props.Token){
        return <Navigate to = "/"/>
    }

  return (
    <div>
    <div className='listContainer'>
        <h1 style={{textAlign:'center'}}>Available Report versions</h1>
        {ReportVersion.map( repver=>{
            return (
            <h5 key={repver.id} className="task">
                {repver.report_version_name}
                <button style={{float:'right'}} onClick = {()=>getFileOnClick(repver.file)} className="btn btn-primary">
                    Get File
                </button>
            </h5>)
        })}
        {/* <button onClick = {()=>handleOnClick()}>Uploadfile</button> */}
    </div>
    {props.IsAdmin?<Link to="/UploadFiles" style={{marginLeft:25}}onClick = {()=>handleOnClick()} className="btn btn-primary">Upload Files</Link>:''}
    {/* <Link to="/UploadFiles" style={{marginLeft:25}}onClick = {()=>handleOnClick()} className="btn btn-primary">Upload Files</Link> */}
    </div>
  )
}

export default ReportVersion