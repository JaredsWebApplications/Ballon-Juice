#!/usr/bin/env bash

# Run the container instance #

NAME="balloonjuice"

[[ "$(whoami)" != "root" ]] && exit

docker build -t "$NAME" .
docker run -it --rm -d -p 5002:80 --name web "$NAME"

