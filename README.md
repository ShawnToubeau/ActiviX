# ActiviX

ActiviX is a at home mental health support tool that aids people who suffer from mental health by encouraging them to perform small but meaningful tasks in hope of leading them to a happier life.

This is a Wentworth Institute of Technology senior project by Shawn Toubeau, Morgan Whittemore, and Zachary Griffin.

## Application Details

This repo contains both the frontend React client and a **mock** Express backend server. The current server was built to help design the API routes and allow the client to experience a normal user flow. Eventually it will be replaced with a Django web server that Morgan is working on which will be responsible for more of our backend operations.

## Getting Started

### Package Manager

The client and the server both use `yarn` to manage 3rd party packages and starting the applications. If you don't have yarn installed, you can install it from [here](https://classic.yarnpkg.com/en/docs/install).

### Installing dependencies

You can install dependencies for both the client and the server by running the following in the root directory.

```bash
yarn run install-dep
```

### Environment Variables

Both applications depend on some environment variables in order to function. The later sections will tell you how to set them up but for now you can get them ready.

The first 2 will be a set of VAPID keys which are used by the Push and Notification APIs.
To generate them, run

```bash
./server/node_modules/.bin/web-push generate-vapid-keys
```

The other will be a MongoDB URI for connecting to a MongoDB database. If you do not have a instance setup already you can follow this [guide](https://docs.atlas.mongodb.com/getting-started/) to do so.

### Frontend

To setup the client, first change into the `client` folder

```bash
cd client
```

and create a `.env` file with the following content. Be sure to insert your **Public VAPID** key that you generated in the previous section.

```env
REACT_APP_PUBLIC_VAPID_KEY=<INSERT-KEY-HERE>
```

You can start the client by running

```bash
yarn run start
```

and access it at [http://localhost:3000](http://localhost:3000)

### Backend

To setup the server, first change into the `server` folder

```bash
cd server
```

and create a `.env` file with the following content. Be sure to insert your **Public VAPID** key, **Private VAPID** key, and **MongoDB URI** that you generated in the previous section.

(**Note**: The **SESSION_SECRET** and **JWT_SECRET** are both string values that are used to sign tokens)

```env
MONGO_URI=<INSERT-URI-HERE>
PUBLIC_VAPID_KEY=<INSERT-KEY-HERE>
PRIVATE_VAPID_KEY=<INSERT-KEY-HERE>
SESSION_SECRET=secret
JWT_SECRET=secret
```

You can start the server by running

(**Note**: If you get an error when you try to start the server, re-running the command a 2nd time usually fixes it. This is because when we run the server in dev mode, it has to transpile the es6 Javascript down to es5 in order to be executable and it tries to start the server at the same time it does that.)

```bash
yarn run start
```

and access it at [http://localhost:8000](http://localhost:8000)

## Building for Production

You can build both the client and the server from the root project directory by running

```bash
yarn run build
```

This will output production builds at `./client/build` and `./server/dist` where you can then run the app with

```bash
yarn run prod
```
