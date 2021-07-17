reset:
	rm -rf db/
	mkdir db/

sync:
	node sync.js

start-db:
	mongod --dbpath=db --port 27018
