const Heroes = require('../heroes/heroesModel');
const HttpStatus = require('http-status-codes');

const getHeroes =  async (req, res) => {
  try {
    const heroes = await Heroes.find({});
    return res.json(heroes);
  } catch (err) {
    return res.send({error: HttpStatus.NOT_FOUND}).status(HttpStatus.NOT_FOUND);
  }
};

const createHero = async (req, res) => {
  try {
    const hero = Heroes(
      {
        name: req.body.name,
        gender: req.body.gender
      });
    if (req.body.name !== '' && req.body.name) {
      await hero.save();
      return res.status(HttpStatus.OK).json(hero);
    } else {
      return res.json({message: "error"}).status(HttpStatus.NO_CONTENT)
    }
  } catch (err) {
    return res.send({error: HttpStatus.INTERNAL_SERVER_ERROR}).status(HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

const HeroesDetails = async (req, res) => {
  try {
    const heroes = await Heroes.findById(req.params.id);
    return res.json(heroes);
  }catch (err) {
    return res.status(HttpStatus.NOT_FOUND).send({error: HttpStatus.getStatusText(404)});
  }
};

const updateHero = async (req, res) => {
  try{
    await Heroes.findByIdAndUpdate(req.params.id, {$set: req.body}, {
      new: true,
    });
    return res.status(HttpStatus.OK);
  } catch (err) {
    return res.send({error: HttpStatus.NOT_MODIFIED}).status(HttpStatus.NOT_MODIFIED)
  }
};

const deleteHero = async (req, res) => {
  try{
    await Heroes.findByIdAndRemove(req.params.id);
    return res.status(HttpStatus.OK);
  } catch (err) {
    return res.send(HttpStatus.NOT_FOUND).status(HttpStatus.NOT_FOUND);
  }
};

module.exports = {
  getHeroes,
  createHero,
  HeroesDetails,
  updateHero,
  deleteHero
};
