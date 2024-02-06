import 'reflect-metadata';
import { app } from './shared/infra/http/app';

app.listen(3000, () => {
  return console.log('Server started on port 3000.');
});

