var express = require('express');
var heroCtrl = require('./heroesCtrl');
var router = express.Router();

router.get('/heroes/', heroCtrl.getHeroes);

router.get('/heroes/?name=', heroCtrl.searchHeroes);

router.post('/heroes',  heroCtrl.createHero);

router.get('/heroes/:id', heroCtrl.HeroesDetails);

router.put('/heroes/:id', heroCtrl.updateHero);

router.delete('/heroes/:id', heroCtrl.deleteHero);

module.exports = { rout: router };



