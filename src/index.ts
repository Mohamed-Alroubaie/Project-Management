import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.listen(process.env.PORT, () =>
  console.log(`Server is Running on Port ${process.env.PORT}`)
);
