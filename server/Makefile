.PHONY: clean
clean:
	rm -rf node_modules
	rm -rf dist

node_modules: package.json
	yarn install

.PHONY: setup
setup: node_modules

.PHONY: build
build: node_modules
	yarn build

.PHONY: serve
serve: node_modules
	yarn start

.PHONY: docker-compose
docker-compose:
	docker-compose up
