
import React, { Component } from 'react';

import * as config from './config'
import request from 'superagent'
import data from './Data';
import Space from './Space';
import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap';

function updateStoredUserData(searchStatus) {
    window.localStorage['searchStatus'] = searchStatus
}

function getStoredUserData() {
    return window.localStorage['searchStatus'] || ''
}

class Spaces extends Component {

  constructor(props, context) {
    super(props, context)
	var date1 = new Date()
    date1.setHours(0,0,0,0)	
    this.state = {spaces: [], loading: true, date: date1, searchStatus: getStoredUserData(), data: data, displayStatus: 'DISPLAY'}
    this.edit = this.edit.bind(this)
	this.editfromimage = this.editfromimage.bind(this)
    this.updateSearchStatus = this.updateSearchStatus.bind(this)
    this.updateDisplayStatus = this.updateDisplayStatus.bind(this)
	this.moveback = this.moveback.bind(this)
	this.moveforward = this.moveforward.bind(this)
  }

moveback(){
 var date1 = this.state.date
 date1.setDate(date1.getDate()-1) 
 date1.setHours(0,0,0,0)
 this.setState({...this.state, date: date1 })
}

moveforward(){
  var date1 = this.state.date
  date1.setDate(date1.getDate()+1)
  date1.setHours(0,0,0,0)
  this.setState({...this.state, date: date1 })
}

edit(e) {

	if(e.target.className === "btn btn-default col-md-1 col-xs-4"){
		var action = '/makeavailableon/'
	} else {
	  	action = '/makeunavailableon/'
	}
	
    if (config.DEVMODE){
     var url = 'http://localhost:3000/api/spaces/' + e.target.id + action + this.state.date.toISOString()
    }else{
         url = 'https://gsc-parking.herokuapp.com/api/spaces/' + e.target.id + action + this.state.date.toISOString()
    
    }
	  
	  
      request
      .put(url)
      .end((err, res) => {
        if (err) {
          console.error(err)
        }
        else {
          const parsed = JSON.parse(res.text)
          this.setState({...this.state, loading: false, spaces: parsed})
        }
      })
  }

  editfromimage(e) {

console.log(e.available)
	if(e.available){
		var action = '/makeunavailableon/'
	} else {
	  	action = '/makeavailableon/'
	}
	
	
    if (config.DEVMODE){
     var url = 'http://localhost:3000/api/spaces/' + e.space.space + action + this.state.date.toISOString()
    }else{
         url = 'https://gsc-parking.herokuapp.com/api/spaces/' + e.space.space + action + this.state.date.toISOString()
    
    }
	  
	  
      request
      .put(url)
      .end((err, res) => {
        if (err) {
          console.error(err)
        }
        else {
          const parsed = JSON.parse(res.text)
          this.setState({...this.state, loading: false, spaces: parsed})
        }
      })
  }
  
  
  
  
  componentWillMount() {
    if (config.DEVMODE){
     var url = 'http://localhost:3000/api/spaces'
    }else{
         url = 'https://gsc-parking.herokuapp.com/api/spaces'
    
    }
	 
      request
      .get(url)
      .end((err, res) => {
        if (err) {
          console.error(err)
        }
        else {
          const parsed = JSON.parse(res.text)
          this.setState({...this.state, loading: false, spaces: parsed})
        }
      })
  }

  updateSearchStatus(e) {
     updateStoredUserData(e.target.value)    
     this.setState({...this.state, searchStatus: e.target.value})
  }
  
  updateDisplayStatus(e) {   
     this.setState({...this.state, displayStatus: e.target.value})
  }
  
  filter(spaces) {
    const status = this.state.searchStatus
	  if (status === ''){
	  	return spaces
	  }
    return spaces.filter(space => {
      if (status !== '') {
        if (space.owner !== status) {
          return false
        }
		return true
      }
 return true
  })}

  
  isAvailable(ele) {
	//first get the matching space in the data ( with the dates)
	let av = this.state.spaces.filter( space => space.number === ele.space) 
	if (av[0] === undefined){return false}
	return av[0].availableOn.indexOf(this.state.date.toISOString()) > -1
}
  

  render() {

    if (this.state.loading) {
      return <div className="activity-indicator"><i className="fa fa-spinner fa-spin"></i> <span>Loading</span></div>
    }
	const filteredSpaces = this.filter(this.state.spaces)
    return (<div>
	<Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">GSC Parking</a>
      </Navbar.Brand>
	  <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#" onClick={ this.moveback }> Move Back A Day <Glyphicon glyph="glyphicon glyphicon-minus"/></NavItem>
        <NavItem eventKey={2} href="#" onClick={ this.moveforward }>Move Forward A Day <Glyphicon glyph="glyphicon glyphicon-plus" /></NavItem>
	</Nav>
		<Nav pullRight>
		<NavItem> <select id="filter-status" className="dropdown-toggle" value={ this.state.displayStatus } onChange={ this.updateDisplayStatus }>
							<option value="DISPLAY">Display</option>
							<option value="EDIT">Edit</option>
							<option value="BOTH">Both</option>
						</select></NavItem>
      </Nav>
    </Navbar.Collapse>
	</Navbar>
       <h4 className="text-center">Available spaces shown in green for {this.state.date.toDateString() }</h4>	
    <div className="container">

        <div style={{marginTop: 5 + 'px'}}></div>
        <div style={this.state.displayStatus === 'EDIT' || this.state.displayStatus === 'BOTH' ? {display: 'inline'} : {display: 'none'}}>
			<div className="search-form form-inline">
				<div className="row">
					<div className="form-group:">
						<select id="filter-status" className="form-control col-xs-8 col-md-6 col-sm-8" value={ this.state.searchStatus } onChange={ this.updateSearchStatus }>
							<option value="">All</option>
							<option value="IT">IT</option>
							<option value="HR/Payroll/Talent">HR/Payroll/Talent</option>
							<option value="DP">Disabled</option>
							<option value="Visitors">Visitors</option>
							<option value="Finance">Finance</option>
							<option value="Urban Design">Urban Design</option>
							<option value="GTD + S">GTD + S</option>
							<option value="WBD">WBD</option>
							<option value="Co.Sec/Legal">Co.Sec/Legal</option>
						</select>
					</div>
				</div>
			</div>
		<div style={{marginTop: 5 + 'px'}}>
	</div>
<div className="row">
        { filteredSpaces.map(space => {
          return (
	<div id="parent" key={space.number}><button onClick={ this.edit } id={space.number} key={space.number} type="button" className={space.availableOn.indexOf(this.state.date.toISOString()) > -1 ? "btn btn-success col-md-1 col-xs-4" : "btn btn-default col-md-1 col-xs-4"}>{space.number}</button></div>
          )
        }) }
</div></div>	
	<div style={this.state.displayStatus === 'DISPLAY' || this.state.displayStatus === 'BOTH' ? {display: 'inline'} : {display: 'none'}}>		
		<svg viewBox="0 0 960 390">
			{this.state.data.map((ele,pos) => {
				if (ele.type === 'rect'){
				return (
                <Space space={ ele } key={pos} clicked={ this.editfromimage} available={this.isAvailable(ele)} date={this.state.date}/>
              )} else {
                  return (<path key={pos} d={ele.path} strokeWidth={"2px"} stroke={"#000000"} fill={ele.fill}/>)
              }
          
          })}
		</svg>
	</div>		
       
	</div></div>
   )}
}
export default Spaces
