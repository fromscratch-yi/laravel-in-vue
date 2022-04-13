
## サンプルアプリの説明
- laravel/uiのAuth機能だけでなく、実際にサンプルアプリとしてTODOアプリを作成しました。
- トップ画面へはログインしていないとアクセスできず、トップ画面にて、TODOリストの登録・編集・削除を行います。こちらをすべてvue.jsを使って実装しています。
- ログインしてるかどうか云々のauth機能については、laravel/uiを使っており一切実装していないです。

## ビルド処理(※初回のみ)
```sh
cp ./src/.env.example ./src/.env && \
docker-compose build --no-cache --force-rm && \
docker-compose up -d && \
docker-compose exec php composer install && \
docker-compose exec php php artisan key:generate && \
docker-compose exec php php artisan migrate:refresh && \
docker-compose exec php npm install
```

## 起動コマンド
```sh
docker-compose up -d && docker-compose exec php npm run watch
```

---

# メモ
- 以下実行＆実装済みのため不要（メモとして各手順を残しています。）

## Laravelインストール（※実行済み）
```sh
docker-compose exec php composer create-project --prefer-dist laravel/laravel .
```

## laravel/uiのインストール（※実行済み）
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
- vueファイル＆scssファイルなどを更新したい場合は、以下コマンドを実行
```sh
docker-compose exec php npm run dev
```
- 監視したい場合は、以下コマンドを実行
```sh
docker-compose exec php npm run watch
```

## TODO機能実装手順（※実装済み）
- Vue-routerのインストール
```sh
docker-compose exec php npm install vue-router
```
- Todoモデルとmigrationファイルの作成
```sh
docker-compose exec php php artisan make:model Todo --migration
```
- migrationファイルを編集して、再度migrationを実行
```sh
docker-compose exec php php artisan migrate
```
- todo用APIコントローラの作成
```sh
docker-compose exec php php artisan make:controller API/TodoController --api
```
