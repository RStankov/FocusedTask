import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use('/status', (_req, res) => {
  res.send('running');
});

app.listen(port, () => console.log(`> Ready on port ${port}`));
