all: signalfn.js

signalfn.js: index.js package.json
	babel index.js > signalfn.js

test: all
	tape test/*.js

prepublish: clean test all

clean:
	rm signalfn.js

.PHONY: all prepublish test clean
