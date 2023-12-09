import express from 'express';
import route from './routes';

const app = express();

app.use(route);
app.get('/', async (req, res) => {
  res.send(`
    <a href='/users'>Users</a>
    <a href='/projects'>Projects</a>
    <a href='/tasks'>Tasks</a>
  `);
});

app.listen(process.env.PORT, () =>
  console.log(`Server is Running on Port ${process.env.PORT}`)
);
