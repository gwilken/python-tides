dev-build:
	docker-compose build;

dev-up:
	docker-compose up --force-recreate;

dev-down:
	docker-compose down;

build:
	docker-compose -f docker-compose.prod.yml build

up:
	docker-compose -f docker-compose.prod.yml up

down:
	docker-compose -f docker-compose.prod.yml down -v
