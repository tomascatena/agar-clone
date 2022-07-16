import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Secure Express app by setting various HTTP headers
app.use(helmet());

// Enable cors
app.use(cors());
// Enable pre-flight
app.options('*', cors);

const PORT = process.env.PORT || 5000;

const expressServer = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const io = new SocketIOServer(expressServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
