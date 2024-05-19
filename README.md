# Eliftech Test Task

Проект вже розміщений за адресою: https://eliftech-1-e4c8.onrender.com/

Цей репозиторій створено для проходження тестового завдання для компанії Eliftech. Репозиторій містить два проекти: сервер, написаний на Node.js, і клієнт, написаний на React.

## Запуск сервера

1. Перейдіть в каталог сервера:
    ```sh
    cd server
    ```
2. Встановіть залежності:
    ```sh
    npm i
    ```
3. Створіть файл `.env` і додайте параметр `MONGODB_CONNECTION`, замінивши `<username>`, `<password>` та інші параметри на власні:
    ```env
    MONGODB_CONNECTION=mongodb+srv://<username>:<password>@<clustername>.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=Cluster0
    ```
4. Запустіть проект:
    ```sh
    npm start
    ```
    Сервер буде доступний за адресою: [http://127.0.0.1:5000](http://127.0.0.1:5000)

## Запуск клієнта

1. Перейдіть в каталог клієнта:
    ```sh
    cd client/eliftech
    ```
2. Встановіть залежності:
    ```sh
    npm i
    ```
3. Створіть файл `.env` і додайте параметр `REACT_APP_HOST`, підключивши сервер:
    ```env
    REACT_APP_HOST=http://127.0.0.1:5000
    ```
4. Запустіть проект:
    ```sh
    npm start
    ```
    Клієнт буде доступний за адресою: [http://127.0.0.1:3000](http://127.0.0.1:3000)
