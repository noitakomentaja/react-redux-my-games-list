import Express from 'express';
import React from 'react';
import Location from 'react-router/lib/Location';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import PrettyError from 'pretty-error';
import config from './config';
import api from './api';
import ApiClient from './app/scripts/services/ApiClient';
import universalRouter from './app/scripts/services/UniversalRouter';
import createStore from './app/scripts/middlewares/create';
import Root from './app/scripts/compositions/Root';

import Index from './app/scripts/views/Index';

const pretty = new PrettyError();
const app = new Express();
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:' + config.apiPort
});

app.use(compression());
app.use(require('serve-static')(path.join(__dirname, 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res);
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const store = createStore(client);
  const location = new Location(req.path, req.query);

  if (__DISABLE_SSR__) {
    res.send('<!doctype html>\n' +
      React.renderToString(<Root assets={webpackIsomorphicTools.assets()} component={<div/>} store={store}/>));
  } else {
    universalRouter(location, undefined, store)
      .then(({component, transition, isRedirect}) => {
        if (isRedirect) {
          res.redirect(transition.redirectInfo.pathname);
          return;
        }
        res.send('<!doctype html>\n' +
          React.renderToString(<Root assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      })
      .catch((error) => {
        if (error.redirect) {
          res.redirect(error.redirect);
          return;
        }
        console.error('ROUTER ERROR:', pretty.render(error));
        res.status(500).send({error: error.stack});
      });
  }
});

if (config.port) {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    } else {
      api().then(() => {
        console.info('==> ✅  Server is listening');
        console.info('==> 🌎  %s running on port %s, API on port %s', config.app.name, config.port, config.apiPort);
        console.info('----------\n==> 💻  Open http://localhost:%s in a browser to view the app.', config.port);
      });
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
