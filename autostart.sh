#!/bin/sh

. python/.venv/bin/activate

cd python && python app.py & node node/index.js


