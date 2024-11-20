#!/bin/bash
# Removes the node_modules folder and then recreates it
rm -rf node_modules package-lock.json
npm install