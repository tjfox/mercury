import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse';
import JSONTree from 'react-json-tree'

const CSV = "LeadID,OwnerID,Owner Name,Date Added,Lead Type,Source,First Name,Last Name,Company,Email,Address,Address 2,City,State,Zip,Lat,Lng,Phone,Cell,Status,Birth Date,Notes,External Id,County,Referrer,Plan Type,Insurance Carrier,Premium,Plan Type Spouse,Insurance Carrier Spouse,Premium Spouse,Spouse,Spouse Dob,Policy Status 1,Policy Source Submitted Id 1,Policy Source Issued Id 1,Policy Status 2,Policy Source Submitted Id 2,Policy Source Issued Id 2,Policy Status 3,Policy Source Submitted Id 3,Policy Source Issued Id 3,Policy Status 4,Policy Source Submitted Id 4,Policy Source Issued Id 4,Policy Status 5,Policy Source Submitted Id 5,Policy Source Issued Id 5,Policy Status 6,Policy Source Submitted Id 6,Policy Source Issued Id 6,Policy Status 7,Policy Source Submitted Id 7,Policy Source Issued Id 7,Policy Status 8,Policy Source Submitted Id 8,Policy Source Issued Id 8,Policy Status 9,Policy Source Submitted Id 9,Policy Source Issued Id 9,Policy Status 10,Policy Source Submitted Id 10,Policy Source Issued Id 10\n" +
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

function buildClientId(clientData) {
  return clientData["First Name"] + " " + clientData["Last Name"]
}


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
    let uniqueIds = [...new Set(data.map(buildClientId))]
    console.log('Unique Clients')
    console.log(uniqueIds)
    let matches = uniqueIds.map(name => data.filter(clientData => name === buildClientId(clientData)))
    console.log(matches);
  }

  findMatchesByDictionary = (data) => {
    let dataMap = {}
    data.map(clientData => {
      const id = buildClientId(clientData)
      if(dataMap[id]) {
        dataMap[id] = [...dataMap[id], clientData]
      }
      else {
        dataMap[id] = [clientData]
      }
    });
    console.log('Dictionary Match')
    console.log(Object.keys(dataMap).map(key => dataMap[key]))
    return Object.keys(dataMap).map(key => dataMap[key]);
  }
  
  mergeRecords = (recordSet) => {    
    let mergedRecord = {};
    const left = recordSet[0];
    const right = recordSet[1];
    const leftDate = Date.parse(left['Date Added']);
    const rightDate = Date.parse(right['Date Added']);
    let mergeResult = {original: {[left.LeadID]:left, [right.LeadID]:right}, conflicts: [], preferredRecord: leftDate > rightDate ? left.LeadID: right.LeadID}


    console.log(`merging ${left} with ${right}`)
    Object.keys(recordSet[0]).map(key => {
      if(left[key] && !right[key]){
        mergedRecord[key] = left[key]
      }
      else if(!left[key] && right[key]) {
        mergedRecord[key] = right[key]
      }
      else if(left[key] === right[key]) {
        mergedRecord[key] = left[key]
      }
      else {
        console.log(`Cannot merge record because ${key}:${left[key]} cannot be resolved with ${right[key]}`)
        console.log(`Using newest data from ${leftDate > rightDate ? "left": "right"}`)
        mergedRecord[key] = leftDate > rightDate ? left[key]: right[key];
        mergeResult.conflicts = [...mergeResult.conflicts, {key, [left.LeadID]:left[key], [right.LeadID]:right[key]}]
      }
    })

    mergeResult.record = mergedRecord;
    return mergeResult;

  }

  parseJavascript = () => {

    var results = Papa.parse(CSV, {
        header: true
    });


    //Both of these functions will return an array matches based on whatever criteria you 
    //are using to determine a match. There are probably more clever javascript ways to accomplish this
    //but this is what came to mind at 11:00pm. Once you have the matches, you can attempt to merge the data
    //into a single record. The first function matches first and last name, the second matches first, last, and address
    this.findMatchesByName(results.data);
    this.findMatchesById(results.data);
    const matches = this.findMatchesByDictionary(results.data).filter(row => row.length > 1);

    const mergedRecords = matches.map(this.mergeRecords);

    console.log(mergedRecords)

    return ( <div><JSONTree data={mergedRecords} hideRoot={true}/></div>);
  };
}

export default App;
