FROM php:7.3-fpm
COPY php.ini /usr/local/etc/php/

RUN apt-get update \
  && apt-get install -y unzip libpq-dev vim zlib1g-dev libzip-dev mariadb-client libonig-dev \
  && docker-php-ext-install zip pdo_pgsql

RUN pecl install xdebug && \
    docker-php-ext-enable xdebug

#Composer install
COPY --from=composer /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /composer
ENV PATH $PATH:/composer/vendor/bin
RUN composer global require "laravel/installer"

WORKDIR /var/www
RUN chown -R www-data:www-data /var/www

RUN curl -SL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y nodejs && \
  npm install -g npm@latest
