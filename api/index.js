import express from 'express';
import loopback from 'loopback';
import session from 'express-session';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import config from '../config';
import routes, {GameRoute} from './routes';
import * as actions from './routes';

const pretty = new PrettyError();
const app = loopback();

app.use(bodyParser.json());

export default function api() {
	return new Promise((resolve) => {

		app.use((req, res) => {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Parse the requested action from url string
			const matcher = req.url.split('?')[0].split('/');
      const action = matcher && actions[matcher[1]];

      if (action) {
        action(req, matcher.slice(2))
          .then((result) => {
            res.json(result);
          }, (reason) => {
            if (reason && reason.redirect) {
              res.redirect(reason.redirect);
            } else {
              console.error('API ERROR:', pretty.render(reason));
              res.status(reason.status || 500).json(reason);
            }
          });
      } else {
        res.status(404).end('NOT FOUND');
      }
    });

    app.listen(config.apiPort);

    resolve();
	});
}