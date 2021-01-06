## Laravelインストール
```sh
docker-compose exec php composer create-project --prefer-dist laravel/laravel .
```

## laravel/uiのインストール
- laravel6.x以上では `php artisan make:auth` コマンドはauth機能を作成できなくなりました。\auth機能は `laravel/ui` をインストールすることによって実装可能となります。
```sh
docker-compose exec php composer require laravel/ui
```

## ビルド処理(※初回のみ)
```sh
cp ./src/.env.example ./src/.env && \
docker-compose build --no-cache --force-rm && \
docker-compose up -d && \

```