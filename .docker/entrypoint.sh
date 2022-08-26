#!/bin/bash

yarn install

yarn migration:run 
yarn audit
yarn start:server
