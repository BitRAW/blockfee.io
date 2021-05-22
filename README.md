# Blockfee.io

Frontend application for blockfee.io

## Development

Is currently under developement, no version has been released

### Local

Clone the repo:

`git clone git@github.com:BitRAW/blockfee.io.git .`

Install dependencies:

`npm install`

Run in develepment mode:

`npm run dev`

### Build

To build a production release locally, run:

`npm run build`

### CI/CD

Pipelines for this project have been setup on google cloud via [cloudbuild.yaml](cloudbuild.yaml). Branches that start with feature will be deployed on the dev.blockfee.io environment, while only the main branch will be deployed onto blockfee.io. other branches are ignored.

### Versioning

The script [versionUp.sh](versionUp.sh) is used to update versions.

`./versionUp.sh`

For historic releases, see [VERSIONS](VERSIONS.md).

## Technology

- TypeScript
- Svelte
- Svelte SPA router
- Tailwind CSS
- ChartJS
- RollUp
- Workbox
- Lottie Animations

## Features

Using BitRAWs Commodity Manager this web frontend displays charts for analyzing various metrics in relation to blockfees.

- Show charts as well as separate blocks
- Installable as offline app with PWA
- caches data and static files
