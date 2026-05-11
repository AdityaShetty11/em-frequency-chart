# DECISIONS.md

## Approach

The goal was to read a CSV file and visualize it meaningfully. I split the work into two parts: a FastAPI backend that owns the data, and a React frontend that owns the visualization. The backend reads the CSV and serves it as JSON over a REST endpoint. The frontend fetches that JSON and renders the chart.

---

## Design Decisions

**FastAPI for the backend**
It requires very little setup for a simple read-only API. It also gives an interactive docs at `/docs` for free, which makes testing the endpoint during development quick.

**Recharts for the chart**
Recharts is built specifically for React, compose charts the same way you compose components, using props to configure each piece. Libraries like D3 give you more control but require a lot more code for something this straightforward.

**No hardcoded URLs**
The backend URL in the frontend and the allowed origin in the backend both live in `.env` files. This means switching from local development to a deployed environment is a one-line change, not a code change.

**CORS restricted to GET only**
The API only reads data and no CRUD operation is involved here, there's no reason to expose write methods to the browser. Limiting it to GET keeps the surface area small.

---

## Improvements After Initial Attempt

**Accurate X-axis spacing**
Initially the X-axis was treating each frequency value as a category, spacing all 30 points equally regardless of their actual values. This made the chart misleading — a 2 Hz gap looked the same as a 20 Hz gap. Adding `type="number"` fixed this, making Recharts treat the axis as a continuous number line and place each point at its true frequency value.

**Reference line visibility**
The X-axis was starting exactly at 43.9 Hz, which is also where the Mode 1 reference line sits. This caused the dashed line to render right at the edge and was barely visible. Adjusting the domain to start 20 Hz before the first data point gave the reference line enough room to be clearly seen.

**Modular frontend structure**
The initial `App.jsx` had everything in one file — the API call, state management, and chart rendering. This was refactored into three focused pieces: a custom hook (`useEffectiveMass.js`) that handles fetching and state, a chart component (`EffectiveMassChart.jsx`) that handles rendering, and `App.jsx` that simply composes them. Each file now has one clear responsibility.
