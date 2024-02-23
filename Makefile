build:
	docker-compose build --no-cache --force-rm

stop:
	docker-compose down

up:
	docker-compose up -d --remove-orphans

composer:
	docker exec test-app bash -c "composer install --ignore-platform-req=ext-zip"

vaciar-database:
	docker exec test-app bash -c "php artisan migrate:reset"
	docker exec test-app bash -c "php artisan migrate"
	docker exec test-app bash -c "php artisan db:seed"

reset:
	docker exec test-app bash -c "php artisan migrate:reset"