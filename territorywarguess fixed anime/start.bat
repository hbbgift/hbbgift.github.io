@echo off
title Meme Radio 2
echo Installing dependencies
Call npm install --silent --no-progress & echo Starting widget... & node server
PAUSE