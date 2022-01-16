<h1 align="center">Football Stats</h1>

<div align="center">
  <strong>A simple website that renders eurpoean football league information from an API</strong>
</div>

<br />

## Website Preview
![Football Stats example](./public/assets/footballStats.gif)

## Table of Contents
- [Objectives](#Objectives)
- [API](#api)
- [Installation](#installation)

## Objectives
- __make API requests:__ requests from a local JSON server with updates from an external source
- __component based:__ react SPA with multiple components sharing state via props, useReducer and useContext where necessary 
- __local CSS scoping:__ keeps CSS code manageable/ readable 
- __SPA with navigation:__ handled by react-router v6

## API
Data sourced from https://www.football-data.org/

```js
GET data from local JSON server at 'json-server --watch src/db/db.json -p 4000'
    
    If current system date < date of next fixture set data to state

    If data is old, fetch data from external API
        TImestamp fetched data with date of next fixture to be played
        PUT new data to JSON sever

Render fetched data
    - League Table
    - Upcoming Fixtures
    - Previous Results
```
## Installation
``npm install``\
``json-server --watch src/db/db.json -p 4000``\
``npm start``