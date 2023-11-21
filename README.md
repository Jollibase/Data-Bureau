# Data Bureau 

The project is heavily dockerised and built off the stack: ReactJs and Django

## Development process
Loading

## Developing Locally

#### Make

`make` is your friend, when you type `make` it will print help

This is tested using MacOs and Ubuntu. Windows test....Loading

#### Requirements

- Each service is running inside docker container. Install Docker using this instruction:
    - https://docs.docker.com/get-docker/
- Install docker compose v2.21.0
- Expected: Python and Node

#### Developing Django locally 

- Configure Python3 and virtualenv locally
- Install poetry
- Use project current python version eg.
    - `poetry env use 3.9`
- Install all dependencies
    - `poetry install`
- If you hava a problem with poetry (poetry --version, does not work), you have to add poetry to local variables, check
  this.
    - https://stackoverflow.com/questions/70003829/poetry-installed-but-poetry-command-not-found

NB: Upon pulling repo, run `git update-index --skip-worktree .env SPA/.env` to remove env file for local changes.

#### Web startup

- To start up local services, run:
    - `make start`
- To stop all local services, run:
    - `make stop`
- To perform migrations, run:
    - `make migrations`

_The first execution may take up to half an hour, as docker images need to be built, so please be patient :)_

#### Access to web interface

- You can access app web interface going to:
    - http://localhost

#### Django migrations workflow

- make migrations flow:
    - if you want to create migrations for every django app, run:
        - `make migrations`

## Frontend v2 ReadMe

https://github.com/Jollibase/Data-Bureau/blob/dev/SPA/README.md
