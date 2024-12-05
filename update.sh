#!/bin/bash
# Updates all npm packages then removes the node_modules folder and then recreates it
npx npm-check-updates -u
rm -rf node_modules package-lock.json
npm install