const app = require('./server');
const PORT =  process.env.PORT || 8080;

// 

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
