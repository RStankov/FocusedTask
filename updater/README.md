# Updater

This is the server used for the auto-update functionality of FocusedTask.

Works with [Squirrel Update File JSON Format](https://github.com/Squirrel/Squirrel.Mac#update-file-json-format).
Counts downloads and updates anonymously.
Designed to be deployed on [Heroku](https://heroku.com/)

## Installation

Requires [yarn](https://yarnpkg.com/) and [docker-compose](https://docs.docker.com/compose/)

```
yarn install
docker-compose up -d --no-recreate
yarn db-migrate
```

## Running

```
yarn dev
```
