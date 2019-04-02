#!/bin/bash

sudo apt-get update
sudo apt-get install -y build-essential libssl-dev curl

# v0.33.11
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

source ~/.nvm/nvm.sh
source ~/.nvm/bash_completion

# Install node 10.15.3
nvm install 10.15.3
nvm use 10.15.3
nvm alias default 10.15.3
