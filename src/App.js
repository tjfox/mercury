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


  findMatchesByName = (data) => {
    let leftToMatch = [...data];
    let matches = [];

    function nameMatch(row, idx, arr) {
      return row['First Name'] === arr[0]['First Name'] &&
      row['Last Name'] === arr[0]['Last Name']
    }

    function nameFilter(row, idx, arr) {
      return !nameMatch(row, idx, arr)
    }

    while(leftToMatch.length) {
      matches = [...matches, leftToMatch.filter(nameMatch)];
      leftToMatch = [...leftToMatch.filter(nameFilter)];
    }

    console.log('Matches')
    console.log(matches)
  }

  findMatchesById = (data) => {
    function buildUniqueId(clientData) {
      return clientData["First Name"] + " " + clientData["Last Name"] + " " + clientData["Address"]
    }

    let uniqueIds = [...new Set(data.map(buildUniqueId))]
    console.log('Unique Clients')
    console.log(uniqueIds)
    let matches = uniqueIds.map(name => data.filter(clientData => name === buildUniqueId(clientData)))
    console.log(matches);
  }
  
  parseJavascript = () => {
    let csv = "LeadID,OwnerID,Owner Name,Date Added,Lead Type,Source,First Name,Last Name,Company,Email,Address,Address 2,City,State,Zip,Lat,Lng,Phone,Cell,Status,Birth Date,Notes,External Id,County,Referrer,Plan Type,Insurance Carrier,Premium,Plan Type Spouse,Insurance Carrier Spouse,Premium Spouse,Spouse,Spouse Dob,Policy Status 1,Policy Source Submitted Id 1,Policy Source Issued Id 1,Policy Status 2,Policy Source Submitted Id 2,Policy Source Issued Id 2,Policy Status 3,Policy Source Submitted Id 3,Policy Source Issued Id 3,Policy Status 4,Policy Source Submitted Id 4,Policy Source Issued Id 4,Policy Status 5,Policy Source Submitted Id 5,Policy Source Issued Id 5,Policy Status 6,Policy Source Submitted Id 6,Policy Source Issued Id 6,Policy Status 7,Policy Source Submitted Id 7,Policy Source Issued Id 7,Policy Status 8,Policy Source Submitted Id 8,Policy Source Issued Id 8,Policy Status 9,Policy Source Submitted Id 9,Policy Source Issued Id 9,Policy Status 10,Policy Source Submitted Id 10,Policy Source Issued Id 10\n" +
        "H2140404,H2494,Scott Keup,10/2/17 11:40,Imported,General List,Carl,Ott,,,34449 County Road 29,,Mountain Lake,MN,56159,43.939276,-94.924319,5074272318,,Prospect,4/1/34,,,Cottonwood,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
        "H2175309,H2494,Scott Keup,10/2/17 11:40,Imported,General List,Carl,Ott,,,34449 County Road 29,,Saint Paul,MN,55113,45.022039,-93.143166,6514829952,,Prospect,5/1/34,,,Ramsey,,,,,,,,,0000-00-00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
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

    var results = Papa.parse(csv, {
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


    
    this.findMatchesByName(results.data);
    this.findMatchesById(results.data);

    
    var count = 1;

    var arrLength = results.data.length;
    var outputList = new Array();
    //outputList.push(results.data[0]);
      //start at first row of contact - set name = last name ...
      //make new list out of rows that have same last name
      //sift through list -- check first name
      //if equal then check address
      //if equal then append to output list and set two contacts to null
      //when appending, if one row has data in position that other row doesn;t then append that
      //if not equal then append first one, set row to null and continue through original contact list

    for(var i = 0; i < arrLength; i++) {
        console.log(" the value of i is: " + i);
        console.log(results.data);
        if(results.data[i].length > 0) console.log(results.data[i]);
        if(results.data[i] != null){
            //console.log(results.data[i])
            var observedLastName = results.data[i]['Last Name'];
            var matchList = results.data.filter(row => results.data[i]['Last Name'] === row['Last Name']); //builds array of matching first names
            var listLength = matchList.length;

            for (var j = 0; j < listLength - 1; j++) {

                let currentFirst = matchList[0]['First Name'];
                let observedFirst = matchList[j]['First Name'];

                if (currentFirst.length && observedFirst.length > 2 && ((currentFirst.charAt(0) && currentFirst.charAt(1) && currentFirst.charAt(2)) === (observedFirst.charAt(0) && observedFirst.charAt(1) && observedFirst.charAt(2)))) {

                    let currentAddress = matchList[0]['Address'];
                    let observedAddress = matchList[j]['Address'];

                    if (currentAddress.length > 7 && observedAddress.length > 7 && ((currentAddress.charAt(0) && currentAddress.charAt(1) && currentAddress.charAt(2) && currentAddress.charAt(3) && currentAddress.charAt(4) && currentAddress.charAt(5) && currentAddress.charAt(6)) && (observedAddress.charAt(0) && observedAddress.charAt(1) && observedAddress.charAt(2) && observedAddress.charAt(3) && observedAddress.charAt(4) && observedAddress.charAt(5) && observedAddress.charAt(6)))) {

                        outputList.push(matchList[0]);
                        let index = results.data.indexOf(matchList[j][{'First Name' : observedFirst, 'Address' : observedAddress}] );
                        console.log("The value of the index is:" + index);
                        // results.data[i] = null;
                        // results.data[i] = new Array();
                        break;
                        //results.data[index] = new Array();
                    }

                }
            }
            console.log(observedLastName);
            console.log(outputList);
            console.log(matchList);
            console.log(results.data);
        }
    }

    console.log(results);
    // var arrayLength = results.length;

    // if (results.data[0]['First Name'] === results.data[1]['First Name']){
    //     return "The First two rows have the same first name";
    // }
    //
    // //Think I have a good outline for how algorithm should behave, just need to be able to access elements in result array
    //
    // //return (<p>{results.data}</p>);
    // else return "Hello, World"
  };
}

export default App;
