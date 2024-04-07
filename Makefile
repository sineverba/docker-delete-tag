include .env

IMAGE_NAME=sineverba/delete-tag
CONTAINER_NAME=delete-tag
APP_VERSION=1.0.1-dev
NODE_VERSION=20.12.1
NPM_VERSION=10.5.1
SONARSCANNER_VERSION=5.0.1
BUILDX_VERSION=0.13.1
BINFMT_VERSION=qemu-v7.0.0-28

sonar:
	docker run --rm -it \
		--name sonarscanner \
		-v $(PWD):/usr/src \
		-e SONAR_HOST_URL=$(SONAR_HOST_URL) \
		-e SONAR_TOKEN=$(SONAR_TOKEN) \
		sonarsource/sonar-scanner-cli:$(SONARSCANNER_VERSION)

fixnodesass:
	npm rebuild node-sass

upgrade:
	npx ncu -u
	npx update-browserslist-db@latest
	npm install
	npm audit fix

preparemulti:
	mkdir -vp ~/.docker/cli-plugins
	curl \
		-L \
		"https://github.com/docker/buildx/releases/download/v$(BUILDX_VERSION)/buildx-v$(BUILDX_VERSION).linux-amd64" \
		> \
		~/.docker/cli-plugins/docker-buildx
	chmod a+x ~/.docker/cli-plugins/docker-buildx
	docker buildx version
	docker run --rm --privileged tonistiigi/binfmt:$(BINFMT_VERSION) --install all
	docker buildx ls
	docker buildx rm multiarch
	docker buildx create --name multiarch --driver docker-container --use
	docker buildx inspect --bootstrap --builder multiarch

build:
	docker build \
		--build-arg NODE_VERSION=$(NODE_VERSION) \
		--build-arg NPM_VERSION=$(NPM_VERSION) \
		--tag $(IMAGE_NAME):$(APP_VERSION) \
		--file dockerfiles/production/build/docker/Dockerfile \
		"."

push:
	docker image push $(IMAGE_NAME):$(APP_VERSION)

multi:
	preparemulti
	docker buildx build \
		--build-arg NODE_VERSION=$(NODE_VERSION) \
		--platform linux/amd64,linux/arm64,linux/arm/v6,linux/arm/v7 \
		--tag $(IMAGE_NAME):$(APP_VERSION) \
		--file dockerfiles/production/build/docker/Dockerfile \
		"."

test:
	docker run -it --rm --entrypoint cat --name $(CONTAINER_NAME) $(IMAGE_NAME):$(APP_VERSION) /etc/os-release | grep "Alpine Linux v3.19"
	docker run -it --rm --entrypoint npm --name $(CONTAINER_NAME) $(IMAGE_NAME):$(APP_VERSION) -v | grep $(NPM_VERSION)
	docker run -it --rm --name $(CONTAINER_NAME) $(IMAGE_NAME):$(APP_VERSION) -v | grep v$(NODE_VERSION)

spin:
	docker run \
		-it \
		--rm \
		--name $(CONTAINER_NAME) \
		-e DOCKER_USERNAME=$(DOCKER_LOGIN) \
		-e DOCKER_PASSWORD=$(DOCKER_PASSWORD) \
		-e ORGANIZATION=$(DOCKER_LOGIN) \
		-e IMAGE=$(CONTAINER_NAME) \
		-e TAG=$(TAG) \
		$(IMAGE_NAME):$(APP_VERSION)

inspect:
	docker run \
	--rm -it \
	--entrypoint /bin/sh \
	--name $(CONTAINER_NAME) \
	$(IMAGE_NAME):$(APP_VERSION)

destroy:
	docker image rm $(IMAGE_NAME):$(APP_VERSION)