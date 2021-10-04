# Valheim Food

## Food Sorter

[![Netlify Status](https://api.netlify.com/api/v1/badges/5851d1c2-685e-4004-9616-070eea73d807/deploy-status)](https://app.netlify.com/sites/valheimfood/deploys)

Hosted at: https://valheimfood.netlify.app/
Project was built with React Native Web, but implementation has only been tested on Web for the timebeing. Mobile app implementation is later.

## Features

- See stats for food in valheim as well as ingredients with sorting.

![preview](./preview.jpg)

## Dependencies && Installation

Requires [Node.js](https://nodejs.org/) v14.15.0. Lower versions are likely not going to work.

Install the dependencies and devDependencies (use yarn to use locked package dependencies)

```sh
yarn
```

## Deployment

Serve the site locally:

```sh
yarn web
```

The site will be viewable at: http://localhost:19006/

Serve a production version of the site
Locally, prepare the site:

```sh
npx expo-optimize
```

To build a production ready version of the site

```sh
expo build:web
```

This creates a production ready static bundle in the `web-build/` directory

[Netlify](https://www.netlify.com/) is used to deploy the website. The project is built from root and served from the `web-build` directory.

## Tech

Base

- [React Native Web](https://necolas.github.io/react-native-web/)
- [Expo](https://docs.expo.dev/)
- [Typescript](https://www.typescriptlang.org/)

UI

- [Native-Base](https://docs.nativebase.io/)
- [React Native Paper](https://callstack.github.io/react-native-paper/index.html)

## Credits

All images and information are pulled from the [Valheim Wiki](https://valheim.fandom.com/wiki/Food)
