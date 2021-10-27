# Blockfee.io

Frontend application for blockfee.io

![GitHub package.json version](https://img.shields.io/github/package-json/v/BitRAW/blockfee.io)
[![W3C Validation](https://img.shields.io/w3c-validation/default?targetUrl=https%3A%2F%2Fblockfee.io)](https://validator.w3.org/nu/?doc=https%3A%2F%2Fblockfee.io%2F)
[![Website](https://img.shields.io/website?down_color=red&down_message=down&up_color=green&up_message=up&url=https%3A%2F%2Fblockfee.io)](https://blockfee.io)
[![License](https://img.shields.io/github/license/BitRAW/blockfee.io)](https://github.com/BitRAW/blockfee.io/blob/main/LICENSE)
[![Developer](https://img.shields.io/badge/Developer-RAW%20Financial%20Technologies-41819A)](https://rft.global)
[![Telegram](https://img.shields.io/badge/Telegram-BlockFee.io-0088cc)](https://t.me/blockfee)

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

Using BitRAWs Commodity Manager this web frontend displays charts for analyzing various metrics in relation to bitcoin transaction fees.

- Show charts as well as separate blocks
- Installable as offline app with PWA
- caches data and static files
