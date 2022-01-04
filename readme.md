<h1 align="center">Football Stats</h1>

<div align="center">
  <strong>A simple website that renders eurpoean football league information from an API</strong>
</div>
<div align="center">
  Using React, React-Router and Material UI
</div>

<br />

## Table of Contents
- [Objectives](#Objectives)
- [API](#api)
- [Installation](#installation)
- [To-Do](#To-Do)

## Objectives
- __make API requests:__ requests from a local JSON server with updates from an external source
- __component based:__ react SPA with multiple components sharing state via props
- __local CSS scoping:__ keeps CSS code manageable/ readable 
- __SPA with navigation:__ handled by react-router v6

## API
Data sourced from https://www.football-data.org/

```js
Fetch data from local JSON server
    If data is current, setState using data fetched

    If data is old, fetch data from external API
        TImestamp fetched data
        delete exiting data from local JSON server
        Post new/updated data to local JSON server

Render fetched data
    - League Table
    - Upcoming Fixtures
    - Previous Results
```
## Installation
npm install\
npm start

## To-Do
- __Local/external API integration__
- __Integrate MUI animations__
- __Use recharts for chart data__
- __Finish writing this file...__
- __Enable github-pages__
- __Make site responsive__
- __Use secure method of storing/calling API key__
