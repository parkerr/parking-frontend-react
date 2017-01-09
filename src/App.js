import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './Data';

class App extends Component {
    
    constructor(props, context) {
    super(props, context)
        this.state = {data: data}
}
     
    
  render() {    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
            <svg viewBox="0 0 955 600">
        {this.state.data.map((ele,pos) => {
            console.log(ele)
            if (ele.type === 'rect'){
          return (
              
              <rect key={pos} x={ele.x} y={ele.y - 662.59839} width={ele.width} height={ele.height} strokeWidth={ele.attr.stroke.width} stroke={ele.attr.stroke} fill={ele.attr.fill}/>
              )} else {
                  return (<path key={pos} d={ele.path} strokeWidth={"2px"} stroke={"#000000"} fill={ele.fill}/>)
              }
          
          })}
            </svg>
      </div>
    );
  }
}

export default App;
