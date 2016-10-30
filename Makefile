all: signalfn.js

signalfn.js: index.js
	babel index.js > signalfn.js

test: all
	tape test/*.js

prepublish: test all

.PHONY: prepublish test build
