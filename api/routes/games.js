import Game from '../models/game';

export function createGame (req, res) {
  return new Promise((resolve, reject) => {
    Game.create({ id: 1, title: 'Ultima VII Part Two: Serpent Isle', text: 'Awesomeness', platform: 'PC' }, (err, game) => {        
      if (err) {
        reject({success: false, err: err});
      }

      resolve({success: true});
    });
  });
}

export function listGames (req, res) {
  return new Promise((resolve, reject) => {
    let queryObj = {};

    if (req.body.platform && req.body.platform !== "Platform") {
      queryObj['platform'] = req.body.platform;
    }

    if (req.body.title) {
      queryObj['title'] = { like: "%" + req.body.title + "%" };
    }

    Game.find({where: queryObj}, (err, games) => {
      if (err) {
        reject({success: false, err: err});
      }

      resolve({success: true, data: games});
    });
  });
}

export function addGame (req, res) {
  return new Promise((resolve, reject) => {

    Game.create({
      title: req.body.title, 
      text: req.body.text, 
      platform: req.body.platform 
    }, (err, game) => {        
      if (err) {
        reject({success: false, err: err});
      }

      resolve({success: true, game: game});
    });            
  });
}

export function updateGame (req, res) {
  return new Promise((resolve, reject) => {
    const {id} = req.body;

    if (id) {
      Game.findById(id, (err, game) => {
        if (err) {
          reject({success: false, err: err});
        }

        game.title = req.body.title;
        game.text = req.body.text;
        game.platform = req.body.platform;

        game.save((err, game) => {
          if (err) {
            reject({success: false, err: err});
          }

          resolve({success: true, id: id, game: game});
        });        
      });
    } else {
      reject({success: false});           
    }
  });
}

export function deleteGame (req, res) {
  return new Promise((resolve, reject) => {
    const {id} = req.body;

    if (!id){
      reject({success: false});
    }

    Game.destroyById(id, (err) => {
      if (err) {
        reject({success: false, err: err});
      }
      resolve({success: true, id: id});
    });
  });
}