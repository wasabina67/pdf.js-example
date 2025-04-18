const express = require('express');
const app = express();
const port = 3000;

app.set('port', port);

app.use(express.static(__dirname + '/docs'));

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});
