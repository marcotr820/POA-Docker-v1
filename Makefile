build:
	docker-compose build --no-cache --force-rm

stop:
	docker-compose down

up:
	docker-compose up -d --remove-orphans

composer:
	docker exec poa-app bash -c "composer install --ignore-platform-req=ext-zip"

vaciar-database:
	docker exec poa-app bash -c "php artisan migrate:reset"
	docker exec poa-app bash -c "php artisan migrate"
	docker exec poa-app bash -c "php artisan db:seed"