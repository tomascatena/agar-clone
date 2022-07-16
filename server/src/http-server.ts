import { app } from './app';
import { registerSocketServer } from '@/socket-server';
import http from 'http';

const PORT = process.env.PORT || 5000;

export const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

  registerSocketServer(server);
});
