import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', function (req, res) {
  res.send({ hello: 'HELLO WORLD!' });
});

app.listen(PORT, function () {
  console.info(`server is running on port: ${PORT}`);
});
