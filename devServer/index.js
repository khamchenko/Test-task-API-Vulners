import app from './app';
import { PORT } from '../config';

app.set('port', PORT);

app.listen(app.set('port'), (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Client running on port: ${PORT}`);
  }
});
