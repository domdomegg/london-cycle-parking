# 🚲 London Cycle Parking Map [(view live)](https://domdomegg.github.io/london-cycle-parking/)

![Screenshot of the London cycle parking map](screenshot.png)

Plots TfL's open data on cycle parking on a map

This repository is hosted as a GitHub pages site so contains the loaded `data` folder too

## Load script

The `load` directory contains a script that pulls all the cycle parking data from the TfL API and seralizes it in a way for easy loading into and lookup from the browser.

To run it:
- ensure the `data` and `data/features` directories exist
- `cd load && npm install && npm start`