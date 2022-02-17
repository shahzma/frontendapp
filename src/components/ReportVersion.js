import React, { useState, useEffect } from 'react';
import {Link, Navigate} from 'react-router-dom';
import img1 from '../images/Redseer_red.jpeg';
import Header from './header';
import{Container, Row, Col } from 'react-bootstrap'
import { Breadcrumb } from 'react-bootstrap';

function ReportVersion(props) {

    const [ ReportVersion, setReportVersion ] = useState([]);

    useEffect(()=>{
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
        window.location.href=fileAddress
    }

    if(!props.Token){
        return <Navigate to = "/"/>
    }

  return (
    <div>
        <Header/>
        <Breadcrumb>
            <Breadcrumb.Item href="/">Logout</Breadcrumb.Item>
            <Breadcrumb.Item href = '#'>
                Reports
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Reportversions</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{textAlign:'center', marginTop:'20px'}}>Available Report versions</h2>
        <div className='listContainer'>
            {/* <h6 style = {{padding:'10px 20px', margin: '10px', color:'#A0AEBF', borderBottom:'0.5px solid #A0AEBF'}}>File Name <div style={{float:'right'}}>Actions</div></h6> */}
            <Row style = {{padding:'10px 20px', margin: '10px', color:'#A0AEBF', borderBottom:'0.5px solid #A0AEBF'}}>
                <Col sm={5}>File Name</Col>
                <Col sm={4}>Date</Col>
                <Col sm={3}><div style={{float:'right'}}>Actions</div></Col>
            </Row>
            {ReportVersion.map( repver=>{
                return (
                // <h5 key={repver.id} className="task">
                //     {repver.report_version_name}{repver.created_on.split('T')[0]}
                    // <button style={{float:'right'}} onClick = {()=>getFileOnClick(repver.file)} className="btn btn-primary">
                    //     Get File
                    // </button>
                // </h5>

                <Row key={repver.id} className="task">
                    <Col sm={5} style={{fontWeight:'bold'}}>{repver.report_version_name}</Col>
                    <Col sm={4} style={{fontWeight:'bold'}}>{repver.created_on.split('T')[0]}</Col>
                    <Col sm={3}>
                    <button style={{float:'right'}} onClick = {()=>getFileOnClick(repver.file)} className="btn btn-primary">
                        Get File
                    </button>
                    </Col>
                </Row>
                )
            }
            )}
            {/* <button onClick = {()=>handleOnClick()}>Uploadfile</button> */}
        </div>
        {props.IsAdmin?<Link to="/UploadFiles" style={{marginLeft:40}}onClick = {()=>handleOnClick()} className="btn btn-primary">Upload Files</Link>:''}
    </div>
  )
}

export default ReportVersion