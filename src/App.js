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
    let csv = "LeadID,OwnerID,Owner Name,Date Added,Lead Type,Source,First Name,Last Name,Company,Email,Address,Address 2,City,State,Zip,Lat,Lng,Phone,Cell,Status,Birth Date,Notes,External Id,County,Referrer,Plan Type,Insurance Carrier,Premium,Plan Type Spouse,Insurance Carrier Spouse,Premium Spouse,Spouse,Spouse Dob,Policy Status 1,Policy Source Submitted Id 1,Policy Source Issued Id 1,Policy Status 2,Policy Source Submitted Id 2,Policy Source Issued Id 2,Policy Status 3,Policy Source Submitted Id 3,Policy Source Issued Id 3,Policy Status 4,Policy Source Submitted Id 4,Policy Source Issued Id 4,Policy Status 5,Policy Source Submitted Id 5,Policy Source Issued Id 5,Policy Status 6,Policy Source Submitted Id 6,Policy Source Issued Id 6,Policy Status 7,Policy Source Submitted Id 7,Policy Source Issued Id 7,Policy Status 8,Policy Source Submitted Id 8,Policy Source Issued Id 8,Policy Status 9,Policy Source Submitted Id 9,Policy Source Issued Id 9,Policy Status 10,Policy Source Submitted Id 10,Policy Source Issued Id 10\n" +
        "H2140404,H2494,Scott Keup,10/2/17 11:40,Imported,General List,Carl,Ott,,,34449 County Road 29,,Mountain Lake,MN,56159,43.939276,-94.924319,5074272318,,Prospect,4/1/34,,,Cottonwood,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2175309,H2494,Scott Keup,10/2/17 11:40,Imported,General List,Carl,Alfveby,,,2700 Oxford St N,,Saint Paul,MN,55113,45.022039,-93.143166,6514829952,,Prospect,5/1/34,,,Ramsey,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2160507,H2494,Scott Keup,10/2/17 11:40,Imported,General List,Moisey,Melamed,,,1350 Nicollet Mall Apt 1700,,Minneapolis,MN,55403,44.969326,-93.27859,6128726542,,Prospect,6/1/34,,,Hennepin,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2160506,H2494,Scott Keup,10/2/17 11:40,Imported,General List,Nellie,Melamed,,,1350 Nicollet Mall,,Minneapolis,MN,55403,44.969326,-93.27859,6128726542,,Prospect,7/1/34,,,Hennepin,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2156301,H2494,Scott Keup,10/2/17 11:40,Imported,General List,Verna,Quale,,,2240 Longhorn Ln,,Buffalo,MN,55313,45.143163,-93.86923,7639723200,,Prospect,4/1/36,,,Wright,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2157008,H2494,Scott Keup,10/2/17 11:40,Imported,General List,Dennis,Quale,,,405 River St S,,Delano,MN,55328,45.044238,-93.789457,7639723200,,Prospect,4/1/36,,,Wright,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2169656,H2494,Scott Keup,10/2/17 11:40,Imported,General List,J,Carpenter,,,5855 Cheshire Pkwy,,Minneapolis,MN,55446,45.059112,-93.464372,7635593934,,Prospect,6/1/36,,,Hennepin,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2169657,H2494,Scott Keup,10/2/17 11:40,Imported,General List,J,Carpenter,,,5855 Cheshire Pkwy Unit 2104,,Minneapolis,MN,55446,45.059112,-93.464372,7635593934,,Prospect,6/1/36,,,Hennepin,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2181892,H2494,Scott Keup,10/17/17 11:45,Imported,TM Lead,Verna,Johnson,,,3649 Dane Rd,,Owatonna,MN,55060,44.10227,-93.162374,5074511929,,Not Interested,1/1/37,,,Steele,,,Humana MAPD,,,Humana MAPD,,Dennis,10/17/17,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2181903,H2494,Scott Keup,10/17/17 11:45,Imported,TM Lead,Verna,Johnson,,,3649 Dane Rd,,Owatonna,MN,55060,44.10227,-93.162374,5074511929,,Not Interested,1/1/37,,,Steele,,,Humana MAPD,,,Humana MAPD,,Dennis,10/17/17,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2158413,H2494,Scott Keup,10/2/17 11:40,Imported,General List,Jean,Johnson,,,11201 Fairfield Rd W,,Hopkins,MN,55305,44.974469,-93.42139,9525440407,,Prospect,1/1/37,,,Hennepin,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2138789,H2525,Mitch Boege,9/25/17 13:07,Imported,TM Lead,George,Larson,,,311 4th Ave SE,,Mapleton,MN,56065,43.922358,-93.953328,5075244585,,Not Interested,1/1/37,,,Blue Earth,,,Blue Cross Blue Shield of MN,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2182882,H2494,Scott Keup,10/23/17 19:40,Imported,TM Lead,Milen,Sefcik,,,620 Gorman St #209,,Shakopee,MN,55379,44.793834,-93.50957,9522338731,,Not Interested,1/1/37,,,Scott,,,Medica,$79 ,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,";

    // let config = {
    //     delimiter: "",	// auto-detect
    //     newline: "",	// auto-detect
    //     quoteChar: '"',
    //     escapeChar: '"',
    //     header: true,
    //     trimHeaders: false,
    //     dynamicTyping: false,
    //     preview: 0,
    //     encoding: "",
    //     worker: false,
    //     comments: false,
    //     step: undefined,
    //     complete: undefined,
    //     error: undefined,
    //     download: false,
    //     skipEmptyLines: false,
    //     chunk: undefined,
    //     fastMode: undefined,
    //     beforeFirstChunk: undefined,
    //     withCredentials: undefined,
    //     transform: undefined
    // };

    let results = Papa.parse(csv, {
        delimiter: "",	// auto-detect
        newline: "",	// auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: true,
        trimHeaders: false,
        dynamicTyping: false,
        preview: 0,
        encoding: "",
        worker: false,
        comments: false,
        step: undefined,
        complete: undefined,
        error: undefined,
        download: false,
        skipEmptyLines: true,
        chunk: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined
    });



    console.log(results);
    // var arrayLength = results.length;
    if (results[0].data[{"First Name" : "Carl"}] === results[1].data[{"First Name" : "Carl"}]){
        return "The First two rows have the same first name";
    }

    //Think I have a good outline for how algorithm should behave, just need to be able to access elements in result array

    //return (<p>{results.data}</p>);
    else return "Hello, World"
  };
}

export default App;
