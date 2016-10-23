import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';
import config from '!json!./config'
let app = express();
app.server = http.createServer(app);
app.use(bodyParser.json({
	limit : config.bodyLimit
}));
// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use('/api', api({ config }));

app.listen(config.port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', config.port, config.port);
});
