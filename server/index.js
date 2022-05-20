const app = require('./server');
const PORT = process.env.PORT || 8081;

// 
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
