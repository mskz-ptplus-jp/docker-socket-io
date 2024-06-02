# Docker for Socket.io

Real-time chat using Socket.IO

## System Requirements

- [Node.js](https://nodejs.org/)
    - [Socket.IO](https://socket.io/)
- [React](https://react.dev/)

## Run

```bash
docker compose up
```

## Access

- Server: [http://localhost:3000](http://localhost:3000)
- Client: [http://localhost:3001](http://localhost:3001)

### Note

- Server responds with a random message.
    - [server/index.js](server/index.js) getRandomMessage() function is used to generate random messages.
