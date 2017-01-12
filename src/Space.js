import React, { Component } from 'react';


class Space extends Component {

  constructor(props, context) {
    super(props, context)
	this.state = {space: this.props.space, available: this.props.available}
	this.clicked = this.clicked.bind(this)
  }

   componentWillReceiveProps(nextProps) {
	this.state = {space: nextProps.space, available: nextProps.available}	
  }
  
  clicked(e) {
	this.setState({...this.state, available: !this.state.available})  
    this.props.clicked(this.state)	
  }
  
  render() {
	const space = this.props.space
	let colour = "#808080"
	
	
		//Work out the colour
	colour =  this.state.available ? "#5cb85c" : "#E0E0E0 "
	

		
	return (
       
	<rect x={space.x} y={space.y - 662.59839} width={space.width} height={space.height} strokeWidth={space.attr.stroke.width} stroke={space.attr.stroke} fill={colour} onClick={this.clicked}/>
			)
	}
}


export default Space
