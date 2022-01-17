<h1 align="center">Football Stats</h1>

<div align="center">
  <strong>A website that renders European football league information from an API</strong>
</div>

<br />

![Football Stats example](./public/assets/footballStats.gif)

<br />

## Table of Contents

-   [Objectives](#Objectives)
-   [API](#api)
-   [Installation](#installation)

## Objectives

-   **make API requests:** requests from a local JSON server with updates from an external source
-   **component based:** react SPA with multiple components sharing state via props, useReducer and useContext where necessary
-   **local CSS scoping:** keeps CSS code manageable/ readable
-   **SPA with navigation:** handled by react-router v6

## API

Data sourced from https://www.football-data.org/

```js
GET data from local JSON server
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

`npm install`\
`json-server --watch src/db/db.json -p 4000`\
`npm start`
