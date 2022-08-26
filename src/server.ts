import { app } from './app';
import { timeBr } from './shared';

app.listen(process.env.PORT, () =>
  console.log(`[${timeBr}] 🚀 The [${process.env.NODE_ENV}] server initialized correctly!`),
);
