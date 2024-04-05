Docker Delete Tag
=================

> This Docker image will allow you to delete a tag from a Docker image in [Docker Hub](https://hub.docker.com/)

| CI/CD | Link |
| ----- | ---- |
| Circle CI | [![CircleCI](https://circleci.com/gh/sineverba/docker-delete-tag.svg?style=svg)](https://circleci.com/gh/sineverba/docker-delete-tag) |
| Semaphore CI | [![Build Status](https://sineverba.semaphoreci.com/badges/docker-delete-tag.svg)](https://sineverba.semaphoreci.com/projects/docker-delete-tag) |
| Sonarqube | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=docker-delete-tag&metric=alert_status)](https://sonarcloud.io/dashboard?id=docker-delete-tag) |
| Coveralls | [![Coverage Status](https://coveralls.io/repos/github/sineverba/docker-delete-tag/badge.svg?branch=master)](https://coveralls.io/github/sineverba/docker-delete-tag?branch=master) |

Available architectures:

+ linux/amd64
+ linux/arm64/v8
+ linux/arm/v6
+ linux/arm/v7

## Local start

+ Run `nvm use`
+ Run `npm install`
+ Copy `.env.bak` in `.env`
+ Compile with your data
+ Type `npm run start` from the root folder

## Docker

Quick Setup:

```shell
docker run -d --name delete-tag \
	-e DOCKER_USERNAME=${DOCKER_USERNAME} \
	sineverba/delete-tag:0.1.0
```

### Variables

| Variable | Usage |
| -------- | ----- |
| DOCKER_USERNAME | Docker hub username |

