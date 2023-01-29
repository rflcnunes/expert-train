start:
	docker-compose up -d
	docker exec -it appfeed_node bash -c "npm run start:dev"

up:
	docker-compose up -d

in:
	docker exec -it appfeed_node sh