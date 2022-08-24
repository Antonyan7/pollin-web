## About Project

It's React JS project combined with Next.js.

## Installation:

yarn install

## Set environment variables:

Some environment variables cannot be set by default in the project for security reasons.

To get them:

- Install `gcloud` CLI on your machine
- use `gcloud auth login` to sign in to your account
- use `gcloud config set project pollin-clinic-portal-dev` to set the project
- navigate to project root in terminal
- use `gcloud secrets versions access latest --secret=CLINIC_PORTAL_DEV_CRDENTIALS > .env` to download secrets as `.env` to use in local

if receive error `gcloud.secrets.versions.access` then please ask your manager to give you an access to this resource.

## Development:

yarn run dev

## Build:

yarn run build

## Installing Husky:

yarn run prepare

## To Visit App:

localhost:3000

## Used Packages:

Husky - Husky handles managing at which point in the Git lifecycle our scripts will run.

Prettier - Prettier is an opinionated code formatter.

Eslint - ESLint is an open source project that helps you find and fix problems with your JavaScript code.

Redux Toolkit (Thunk) - For state management is used Redux Thunk with Toolkit. It's a middleware that lets you call action creators that return a function instead of an action object.

# Documentation

1. [Development Polcies](https://docs.google.com/document/d/1Iez6mYaCN5FO3Ehfb8MgCPe1MiSL_LRpLI5lj_3VFDg/edit#heading=h.e77667m46viu)
1. [API Rules](https://github.com/OPN-Technologies/pollin-tech-docs/blob/master/APIRequirements/GeneralAPIRules.md)
