uglify:
	cat ./src/pi.js ./src/seed.js ./src/backboneAdapter.js | uglifyjs -o ./bin/seed.min.js
	cat ./src/pi.js ./src/seed.js ./src/backboneAdapter.js > ./bin/seed.js



