import React, { Component} from 'react';
import {Link, Navigate} from 'react-router-dom';




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

  render() {

    if(!this.props.Token){
      return <Navigate to = "/"/>
  }

    return (
      <div className='listContainer'>
        <h2 style={{textAlign:'Center'}}>Available Reports</h2>
        <h3 style = {{padding:'10px 20px', margin: '10px', color:'#A0AEBF', borderBottom:'2px solid #A0AEBF'}}>File Name <div style={{float:'right'}}>Actions</div></h3>
        { this.state.books.map( book => {
          return (
          <h3 key={book.id} className="task">
            {book.report}
            <Link to="/ReportVersion" style={{float:'right'}} onClick = {()=>this.handleOnClick(book.report, book.is_admin)} className="btn btn-primary">
              ReportVersions
            </Link>
            
          </h3>)
        })}
        <br/>
      </div>
    );
  }
}

export default Books;
