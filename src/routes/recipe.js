const express = require('express');
const router = express.Router();
const RecipeService = require('../services/recipe-service');

router.get('/all', async (req, res) => {
  try {
    const recipes = await RecipeService.findAll();
    if (recipes.length === 0);
    res.send(recipes);
    // res.render('recipes', { recipes });
  } catch (err) {
    res.send(err.response.data.message);
  }
});

router.post(`/`, async (req, res) => {
  try {
    const recipe = await RecipeService.add(req.body);
    res.send(recipe);
  } catch (err) {
    res.send(err.response.data.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await RecipeService.findById(id);

    if (!recipe) {
      res.status(404).send(`Error: Could not find recipe for id >${id}<`);
    } else {
      res.send(recipe);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    let { query, body } = req;
    // console.log('ROUTES');
    // console.log(query);

    // Could loop the keys for multiple queries
    const keys = Object.keys(query);
    const json = {};

    keys.forEach(key => {
      const value = query[key];
      // console.log(value);
      json[key] = JSON.parse(value);
    });

    // console.log(json);

    // recipes = await RecipeService.find({ servingSize: { '$gte': 0, '$lte': 5 }, cookingTime: { '$gte': 0, '$lte': 120 } }).sort(body.sort);
    const recipes = await RecipeService.find(json).sort(body.sort);

    if (recipes.length === 0) {
      res.status(404).send(`Error: Could not find recipes`);
    } else {
      res.send(recipes);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.put('/', async (req, res) => {
  try {
    const { query, body } = req;
    const update = await RecipeService.update(query, body);
    res.send(update);
  } catch (err) {
    res.send(err.response.data.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const status = await RecipeService.deleteById(id);
    res.send(status);
  } catch (err) {
    res.send(err.response.data.message);
  }
});

// get img for particular recipe
router.get('/:id/img/:imgId', async (req, res) => {
  try {
    const { id, imgId } = req.params;
    const url = `${process.cwd()}/src/assets/imgs/${imgId}`;
    const recipe = await RecipeService.findById(id);

    if (!recipe) {
      res.status(404).send(`Error: Could not find recipe for id >${id}<`);
    } else {
      res.sendFile(url);
    }
  } catch (err) {
    res.send(err.response.data.message);
  }
});

module.exports = router;
