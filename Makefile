all:
	tsc --build src/js
	python3 -m http.server --directory src/