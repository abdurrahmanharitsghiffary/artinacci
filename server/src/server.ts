import dotenv from 'dotenv';
import moduleAlias from 'module-alias';

dotenv.config();
moduleAlias.addAlias('@app', __dirname);

import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
