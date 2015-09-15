import React from 'react';
import {Route} from 'react-router';
import App from '../views/App';
import Index from '../views/Index';
import NewGameEntry from '../views/NewGameEntry';
import ViewGameEntry from '../views/ViewGameEntry';
import EditGameEntry from '../views/EditGameEntry';

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Index}/>
      <Route path="/game/add" component={NewGameEntry}/>      
      <Route path="/game/view/:gameId" component={ViewGameEntry}/>
      <Route path="/game/edit/:gameId" component={EditGameEntry}/>
      <Route path="*" component={Index}/>
    </Route>
  );
}