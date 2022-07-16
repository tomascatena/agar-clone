import express from 'express';
import helmet from 'helmet';

export const app = express();

// Secure Express app by setting various HTTP headers
app.use(helmet());
