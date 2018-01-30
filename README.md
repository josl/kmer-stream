# kmerjs 
> Finds kmers in a fastq file and sends them to a server

![][logo]

[logo]: cover.png

## Dependencies

- [Node.js](https://nodejs.org/en/)
- [Babel](https://babeljs.io/docs/setup/#installation)
- [Docker](https://docs.docker.com/install/)

## Install

#### Backend

```sh
$ cd backend
$ npm install
```

#### Frontend

```sh
$ cd frontend
$ npm install && bower install
```

#### Library

```sh
$ cd library
$ npm install && bash compile.sh
```

## Usage

Follow the steps in the following order. For backend and front you will need separate terminals.

#### Library
```sh
$ babel-node lib/cli.js
```

#### Backend

```sh
$ cd backend
$ npm start
```

#### Frontend

```sh
$ cd frontend
$ grunt serve
```

#### Docker
Remember to follow installation of Backend, Frontend and Library steps.

Install on Docker
```sh
$ cd frontend
$ grunt docker
$ cd ..
$ docker-compose up -d
```

Install on CGE
```sh
$ cd frontend
$ grunt remote
$ cd ..
$ docker-compose up -d
```
## License
Apache-2.0 © [Jose Luis Bellod Cisneros](http://josl.github.io)
