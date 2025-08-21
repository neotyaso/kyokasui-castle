FROM php:8.2-fpm-alpine

RUN apk add --no-cache nodejs npm sqlite sqlite-dev bash

RUN docker-php-ext-install pdo pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

RUN chmod -R 755 /app/storage /app/bootstrap/cache

RUN touch /app/database/database.sqlite
RUN php artisan migrate --force

EXPOSE 8080

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
