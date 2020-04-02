# ActiviX

ActiviX is a at home mental health support tool that aids people who suffer from mental health by encouraging them to perform small but meaningful tasks in hope of leading them to a happier life.

This is a Wentworth Institute of Technology senior project by Shawn Toubeau, Morgan Whittemore, and Zachary Griffin.

## Application Details

This repo contains a React frontend client`[1]`, a Django RESTful backend`[2]`, and scripts for installing a MQTT server and MQTT client on linux based systems`[3]`.

---

## [1] Getting Started - Client

A **mock** Express backend server is provided because it was used to help design the API routes and allow the client to experience a normal user flow. The goal was to connect the client with the Django backend server but we unfortunately ran out of time.

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

---

## [2] Getting Started - Django REST Backend API

The backend of this project is accessed through a RESTful API for use with the frontend or other applications. The API is built from a Django project using Django REST Framework.
Models can be found in the `activixapi/models.py` file, each of which has a call available for POST, GET, PUT, and DELETE. The API will accept data in standard JSON format. A specific record can be accessed through the API with it's corresponding primary key/unique ID. Every URL has the same functionality for this -- a /[pk]/ must be added to the general URL for the desired model. For example, to see user with ID = 70, the URL would be /users/70/. The data is serialized to or from JSON appropriately and any requested data will be in the JSON format as well.

---

## [3] MQTT Scripts

### Server

To implement the MQTT server/broker, run `./mosquittoInstall.sh` which will do a few things:

- Update your environment to ensure MQTT is available
- Install Mosquitto and Mosquitto-clients
- Enable the service to start and run on restart
- Log events for troubleshooting
- Echo Version information

### Client

To implement the MQTT client, run `./clientInstall.sh`

Client Dependencies:

- Python2.7 and above
- PIP3

On a linux-based client, this script can install the client software. This will use the `pip` command to install the `paho.mqtt` service and log the installation within the `.mqttLog` file
