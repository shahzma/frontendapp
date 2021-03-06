import React, { Component} from 'react';
import {Link, Navigate} from 'react-router-dom';
import Header from './header';
import{Container, Row, Col, Button } from 'react-bootstrap'
import { Breadcrumb } from 'react-bootstrap';
import img1 from '../images/Redseer_red.jpeg';

class Books extends Component {
  
  constructor(props){
    super(props)
    // let is_admin = false
    this.state = {
      books: [],
      // is_admin
    }
  }

  //fires on page load
  componentDidMount(){
    fetch('http://127.0.0.1:8000/api/reportuser/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.Token}`
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        this.setState({books: data})
        // this.setState({is_admin: data[0].is_admin})
        // console.log('is_admin=', this.state.is_admin)
      }
    )
    .catch( error => console.error(error))
  }


  handleOnClick = (report, is_admin) =>{
      console.log('handleonclickReport', report);
      console.log('isAdmin=', is_admin)
    //   window.location.href="/ReportVersion"
      this.props.getReportName(report, is_admin);
    //   if(true){
    //       return <Navigate to = "/ReportVersion" replace={true}/>
    //   }
  }

  handleLogout = ()=>{
    console.log('logout')
    window.location.href='/'
  }

  render() {
    
    if(!this.props.Token){
      return <Navigate to = "/"/>
  }

    return (
      <div>
        <Header/>
        <Row>
          <Col>
          
          </Col>
          <Col>
          <Button style={{'margin':'10px', 'float':'Right', 'marginRight':'50px', 'backgroundColor':'#4D4A50', 'border':'None'}} onClick = {()=>this.handleLogout()}>Logout</Button>
          </Col>
        </Row>
        <h2 style={{marginLeft:'42vw' ,marginTop:'20px', color:'#4D4A50'}}>Reports</h2>
        <div className='listContainer'>
          {/* <h6 style = {{padding:'10px 20px', margin: '10px', color:'#A0AEBF', borderBottom:'0.5px solid #A0AEBF'}}>File Name <div style={{float:'right'}}>Actions</div></h6> */}
          <Row style = {{padding:'10px 20px', margin: '10px', color:'#A0AEBF', borderBottom:'0.5px solid #A0AEBF'}}>
                <Col sm={5}>Report Name</Col>
                <Col sm={4}>Last Update</Col>
                <Col sm={3}><div style={{float:'right'}}> Available Actions</div></Col>
          </Row>
          { this.state.books.map( book => {
            return (
              // <h3 key={book.id} className="task">
              //   {book.report}
              //   <Link to="/ReportVersion" style={{float:'right'}} onClick = {()=>this.handleOnClick(book.report, book.is_admin)} className="btn btn-primary">
              //     ReportVersions
              //   </Link>
              // </h3>

              <Row key={book.id} className="task">
                    <Col sm={5} style={{fontWeight:'bold'}}>{book.report}</Col>
                    <Col sm={4} style={{fontWeight:'bold'}}>{Date(book.date).split(' ')[1] +" " + Date(book.date).split(' ')[2]+" "+ Date(book.date).split(' ')[3] }</Col>
                    <Col sm={3}>
                    <Link to="/ReportVersion" style={{float:'right' , backgroundColor:'#4D4A50', border:'None'}} onClick = {()=>this.handleOnClick(book.report, book.is_admin)} className="btn btn-primary">
                      View Files
                    </Link>
                    </Col>
              </Row>
              )
          })}
          <br/>
        </div>
      </div>
    );
  }
}

export default Books;
