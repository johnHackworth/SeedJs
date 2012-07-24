MOCHA_OPTS=
REPORTER = dot

uglify:
	cat ./src/pi.js ./src/seed.js ./src/backboneAdapter.js | uglifyjs -o ./bin/seed.min.js
	cat ./src/pi.js ./src/seed.js ./src/backboneAdapter.js > ./bin/seed.js

mocha:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--bail \
		test/*

install:
	npm install mocha
	npm install chai
	npm install jquery

