import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import rootRouter from './src/apis/router';
import Logger from './src/common/helpers/Logger';
import errorMiddleware from './src/common/middleware/errorHandlers';

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({ origin: true, credentials: true }));
// app.use(expressValidator())

app.get('/', function (req, res) {
  res.send({ hello: 'HELLO WORLD!' });
});

// router
rootRouter.forEach((route) => {
  app.use('/', route);
});
app.use(errorMiddleware);

const connectString = process.env.MONGODB_URI;
if (!connectString) {
  Logger.error('connectString invalid');
} else {
  mongoose
    .connect(connectString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => Logger.info('Database connect successfully! '))
    .catch((err) => Logger.error(err));
}

const httpServer = createServer(app);

const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: '*',
  },
});
app.set('socketIo', io);
io.on('connection', (socket) => {
  console.info('connect socket', socket.id);
  socket.on('connect_room', (room) => {
    console.log("vao room", room)
    socket.join(room)
  })
  socket.on('disconnect', function () {
    Logger.warn('user ' + socket.id + ' disconnected');
    Logger.warn('socket disconnected : ' + socket.id);
  });
});

httpServer.listen(PORT, function () {
  console.info(`server is running on port: ${PORT}`);
});
