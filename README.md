## About Project

It's React JS project combined with Next.js.

## Prerequisites

Please use:

- node `v16.18.1` (lts/gallium)
- [yarn](https://classic.yarnpkg.com/en/docs/install)
- YARN Should be on v2
  ### Install Yarn v2 If you don't have
  - Run npm install -g yarn to update the global yarn version to latest v1
    Go into your project directory
    Run yarn set version berry to enable v2 (cf https://yarnpkg.com/getting-started/migration for more details)

## Installation

```
yarn install
```

## Set environment variables:

Environment variables cannot be set by default in the project for security reasons.

To get them:

- Install `gcloud` CLI on your machine
- use `gcloud auth login` to sign in to your account
- use `gcloud config set project pollin-clinic-portal-dev` to set the project
- navigate to project root in terminal
- [LOCAL_MOCK] - use `gcloud secrets versions access latest --secret=CLINIC_PORTAL_MOCK_ENVIRONMENT_CRDENTIALS > .env` to download secrets as `.env` to use in local
- [DEV_SERVER] - use `gcloud secrets versions access latest --secret=CLINIC_PORTAL_DEV_ENVIRONMENT_CRDENTIALS > .env` to download secrets as `.env` to use in local

If receive error `gcloud.secrets.versions.access` then please ask your manager to give you an access to this resource.

**NOTE: Do not use IDE terminal for the `gcloud` commands or you will get permission errors**

## Development:

```
yarn run dev
```

## Build:

```
yarn run build
```

## Installing Husky:

```
yarn run prepare
```

## To Visit App:

```
localhost:3000
```

## Used Packages:

Husky - Husky handles managing at which point in the Git lifecycle our scripts will run.

Prettier - Prettier is an opinionated code formatter.

Eslint - ESLint is an open source project that helps you find and fix problems with your JavaScript code.

Redux Toolkit (Thunk) - For state management is used Redux Thunk with Toolkit. It's a middleware that lets you call action creators that return a function instead of an action object.

# Documentation

1. [Development Polcies](https://docs.google.com/document/d/1Iez6mYaCN5FO3Ehfb8MgCPe1MiSL_LRpLI5lj_3VFDg/edit#heading=h.e77667m46viu)
1. [API Rules](https://github.com/OPN-Technologies/pollin-tech-docs/blob/master/APIRequirements/GeneralAPIRules.md)

# Application URLs

1. DEV: https://pollin-clinic-portal-dev.nn.r.appspot.com/
