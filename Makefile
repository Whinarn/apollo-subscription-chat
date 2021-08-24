.PHONY: clean
clean:
	make -C client clean
	make -C server clean

node_modules: package.json
	yarn install

.PHONY: setup
setup: node_modules
	make -C client setup
	make -C server setup

.PHONY: serve
serve: node_modules
	yarn serve
