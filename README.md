# Расписание КубГАУ

## GitFlow:

- main - продакшн ветка
- build - ветка для конфигурации сборки
- dev - основная ветка разработки
- test - ветка для тестов
- ui - ветка для shared-компонентов
- storybook - ветка для прототипирования в сторибук
- hotfix - ветка для горящих исправлений
- release - ветка для релизов

Коммиты осуществляются следующим образом: <имя ветки>/<краткое описание фичи>. Например, dev/added like feature.

## Сборка Webpack 5.89.0

### Сборка включает:

<table>
    <tr>
        <th>Номер</th>
        <th>Технология</th>
        <th>Версия</th>
    </tr>
    <tr>
        <td>1</td>
        <td>React</td>
        <td>18.3.1</td>
    </tr>
    </tr>
    <tr>
        <td>2</td>
        <td>TypeScript</td>
        <td>5.5.4</td>
    </tr>
    </tr>
    <tr>
        <td>3</td>
        <td>react-router-dom</td>
        <td>6.21.2</td>
    </tr>
    <tr>
        <td>4</td>
        <td>storybook</td>
        <td>8.2.7</td>
    </tr>
    <tr>
        <td>5</td>
        <td>eslint</td>
        <td>9.8.0</td>
    </tr>
    <tr>
        <td>6</td>
        <td>testing-library/react</td>
        <td>16.0.0</td>
    </tr>
</table>

### Swagger

- API располагаются по адресу: http://51.250.105.105:8080/swagger#/

### Стенды:

- prod: https://kubsau-shedule.netlify.app/
- release: https://release--kubsau-shedule.netlify.app/
- dev: https://dev--kubsau-shedule.netlify.app/
- storybook: soon
