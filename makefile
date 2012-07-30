MOCHA_OPTS=
REPORTER = spec

uglify:
	cat ./src/seed.js ./src/backboneAdapter.js | ./node_modules/uglify-js/bin/uglifyjs -nc -o ./bin/seed.min.js
	cat ./src/seed.js ./src/backboneAdapter.js > ./bin/seed.js

mocha:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--bail \
		test/*

install:
	npm install mocha
	npm install chai
	npm install jquery
	npm install uglify-js

doc:
	yuidoc ./src/ -o ./docs
