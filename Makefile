IMAGE_NAME=node-express-ts-template

docker.build:
	docker build -t $(IMAGE_NAME) .

start:
	docker run --name $(IMAGE_NAME)-container -p 8000:8000 $(IMAGE_NAME)

stop:
	docker stop $(IMAGE_NAME)-container

remove: stop
	docker rm $(IMAGE_NAME)-container
	docker image rm $(IMAGE_NAME)

update: remove docker.build
