import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.parseJavascript()}
          This is going to be our super sweet app
        </p>
      </div>
    );
  }


  parseJavascript = () => {
    let csv = "the,list\nis,here";
    let results = Papa.parse(csv);
    console.log(results);
    return (<p>{results.data}</p>)

  };
}

export default App;
