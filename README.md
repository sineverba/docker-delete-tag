Docker Delete Tag
=================

> This Docker image will allow you to delete a tag from a Docker image in [Docker Hub](https://hub.docker.com/) or in Gitlab Registry.

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

Quick Setup (to delete a tag in Docker Hub)

```shell
docker run -d --name delete-tag \
	-e LOG_LEVEL=debug \
	-e DOCKER_USERNAME=${DOCKER_USERNAME} \
	-e DOCKER_PASSWORD=${DOCKER_PASSWORD} \
	-e ORGANIZATION=${ORGANIZATION} \
	-e IMAGE=${IMAGE} \
	-e TAG=${TAG} \
	sineverba/delete-tag:1.0.2
```

Quick Setup (to delete a tag in Gitlab registry)

```shell
docker run -d --name delete-tag \
	-e LOG_LEVEL=debug \
	-e GITLAB_TOKEN=${GITLAB_TOKEN} \
	-e IMAGE=${IMAGE} \
	-e TAG=${TAG} \
	sineverba/delete-tag:1.0.2
```

### Variables

| Variable | Usage | Mandatory |
| -------- | ----- | --------- |
| LOG_LEVEL | Level of the log | Y |
| DOCKER_USERNAME | Docker hub username | N - can be omitted but need GITLAB_TOKEN |
| DOCKER_PASSWORD | Docker hub password (could the PAT Personal Access Token) | N - can be omitted but need GITLAB_TOKEN |
| GITLAB_TOKEN | Gitlab Personal Access Token | N - Can be omitted but only if specified DOCKER_USERNAME and DOCKER PASSWORD |
| ORGANIZATION | Org name | N - Only for Docker hub |
| IMAGE | Image name | Y |
| TAG | Tag to delete | Y |

