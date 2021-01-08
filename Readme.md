## Laravelインストール
```sh
docker-compose exec php composer create-project --prefer-dist laravel/laravel .
```

## laravel/uiのインストール
- laravel6.x以上では `php artisan make:auth` コマンドはauth機能を作成できなくなりました。\auth機能は `laravel/ui` をインストールすることによって実装可能となります。
- 参考：https://qiita.com/daisu_yamazaki/items/b946594896179abcd203
```sh
docker-compose exec php composer require laravel/ui
```
- auth機能関連ファイル作成（一度でOK）
```sh
docker-compose exec php php artisan ui vue --auth
docker-compose exec php npm install && docker-compose exec php npm run dev
```

## ビルド処理(※初回のみ)
```sh
cp ./src/.env.example ./src/.env && \
docker-compose build --no-cache --force-rm && \
docker-compose up -d && \
docker-compose exec php composer install && \
docker-compose exec php php artisan key:generate && \
docker-compose exec php php artisan migrate:refresh && \
docker-compose exec node npm install
```