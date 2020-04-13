EXTENSIONS_FOLDER=$(HOME)/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions
DEST="$(EXTENSIONS_FOLDER)/net.ryanmccuaig.APIAuthDynamicValue"

build: dist/APIAuthDynamicValue.js

dist/APIAuthDynamicValue.js: APIAuthDynamicValue.js
	npx webpack

install: dist/APIAuthDynamicValue.js
	mkdir -p $(DEST)
	cp dist/APIAuthDynamicValue.js $(DEST)

node_modules: package.json
	npm i
	@touch node_modules

clean:
	rm -rf dist

clobber:
	rm -rf node_modules
