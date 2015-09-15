import {ModelBuilder, DataSource} from 'loopback-datasource-juggler';

// Create instance of the Inmemory Datasource
const dataSource = new DataSource('memory');

// Describe Game Schema
const GameSchema = {
	id: Number,
	title: String,
	text: String,
	platform: String
};

// Compile the Game model definition into a JS constructor
const Game = dataSource.define('Game', GameSchema);

Game.attachTo(dataSource);

export default Game;