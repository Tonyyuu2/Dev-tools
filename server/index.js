const app = require('./server');
const PORT = process.env.PORT || 9001;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
