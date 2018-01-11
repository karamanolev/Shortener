# Shortener
URL shortening service example (Django + React)

# REST API
`POST /v1/links`

**Create a link.**

Request:

    {
        "url": "<target url>"
    }

Response:

    {
        "hash": "qwerty"
    }

`GET /v1/qwerty`

**Redirect to the full URL of the `qwerty` hash**

`GET /v1/links/{hash}`

**Fetches the details of a hash**

Response:

    {
        "id": 123,
        "dateCreated": "iso datetime",
        "hash": "qwerty",
        "fullUrl": "http://...."
    }

`PATCH /v1/links/{hash}`

**Updates the hash with a new URL.**

Request:

    {
        "url": "<target url>"
    }

`DELETE /v1/links/{hash}`

**Deletes a hash.**

# Tech stack
The backend runs vanilla Django 2.0.
Data is persisted in a SQLite database.

The frontend uses react.js with react-router-dom. It's built with
webpack and served using webpack-dev-server for dev purposes.

# How to run
There are two Dockerfiles in `backend/` and `frontend/` respectively.
They can be used with docker-compose trivially.
Running the project without Docker is not difficult, but requires
Django and node.js. The Dockerfiles are an easy reference how to run
the project locally.

Make sure you have Docker and docker-compose.

    $ docker-compose up

Opening a browser and going to http://localhost:8889/ should work.

When finished, simply execute:

    $ docker-compose down

*Note for running locally:* Webpack is configured to proxy requests
for the API to http://backend:8888/ with backend being a hostname
managed by docker-compose. Change

    proxy: {
        '/v1': 'http://backend:8888',
    },

to have `localhost` instead of `backend`.
