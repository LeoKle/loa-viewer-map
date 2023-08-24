# LoA Viewer Map

This project was created as an initial test version for the [LoA Viewer project of Vatsim Germany][LoAProject].
It has been integrated and developed further [in the following repository](LoAProject).
Its purpose is to display agreements and COPs (Coordination Entry/Exit Point) defined inside [Letter of Agreements][LoA].

[LoA]: https://www.faa.gov/air_traffic/publications/atpubs/foa_html/chap4_section_3.html
[LoAProject]: https://github.com/vatger/loa-viewer

## Demonstration

The searchbar allows to search all defined agreements. If one entry of the agreement (partially) matches it will be shown.

I defined some examples inside the `src/data` folder. This data will, once integrated into the LoA Viewer project, be pulled from the backend.

Examples:

Search for waypoints:
![Picture of current version 1](https://i.imgur.com/S3lihp0.png)

Search for sectors:
![Picture of current version 2](https://i.imgur.com/13Wgfq7.png)

## Run this project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
