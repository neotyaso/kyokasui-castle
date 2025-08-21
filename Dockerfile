FROM php:8.2-fpm-alpine

# 必要なパッケージをインストール（sqlite-devを追加）
RUN apk add --no-cache \
    nodejs \
    npm \
    sqlite \
    sqlite-dev

# PHP拡張をインストール
RUN docker-php-ext-install pdo pdo_sqlite

# Composerをインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリを設定
WORKDIR /app

# ファイルをコピー
COPY . .

# 依存関係をインストール
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# 権限設定
RUN chmod -R 755 /app/storage /app/bootstrap/cache

# データベースファイル作成
RUN touch /app/database/database.sqlite

EXPOSE 8080

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
