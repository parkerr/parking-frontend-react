import React, { Component } from 'react';


class Space extends Component {

  constructor(props, context) {
    super(props, context)
	this.state = {space: this.props.space}
	this.clicked = this.clicked.bind(this)
  }

  clicked(e) {
    this.props.clicked(this.state.space)	
  }
  
  render() {
	const space = this.props.space
	let colour = "#808080"
	
	if(this.props.available[0]  === undefined){}
	else {
		
		//Work out the colour
	colour =  this.props.available[0].availableOn.indexOf(this.props.date.toISOString()) > -1 ? "#5cb85c" : "#E0E0E0 "

	}
		
		
	return (
       
	<rect x={space.x} y={space.y - 662.59839} width={space.width} height={space.height} strokeWidth={space.attr.stroke.width} stroke={space.attr.stroke} fill={colour} onClick={this.clicked}/>
			)
	}
}


export default Space
