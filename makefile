uglify:
	cat ./src/pi.js ./src/seed.js | ./node_modules/uglify-js/bin/uglifyjs -o ./bin/seed.js
	cat ./src/pi.js ./src/seed.js | ./node_modules/uglify-js/bin/uglifyjs -o ./bin/seed.min.js



