import 'reflect-metadata';
import { config } from 'dotenv';
import 'dotenv/config';
import { app } from './shared/infra/http/app';

config();

app.listen(3000, () => {
  return console.log('Server started on port 3000.');
});

