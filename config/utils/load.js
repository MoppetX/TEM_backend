/* eslint-disable */

const RecipeModel = require('../../src/models/recipe');
const UserModel = require('../../src/models/user');

function randomBetween(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

const loadDummyData = async () => {
  let debug = false;
  // debug = true;

  try {
    await UserModel.deleteMany();
  } catch (err) {
    if (err.message !== 'ns not found') {
      console.error(err.message);

      process.exit(1);
    }
  }

  try {
    await RecipeModel.deleteMany();
  } catch (err) {
    if (err.message !== 'ns not found') {
      console.error(err.message);
      process.exit(1);
    }
  }

  const firstUser = {
    name: 'Antonia',
    email: 'tonia@mail.com',
    password: '1234567',
  };

  const onlyUser = await new UserModel(firstUser);

  await onlyUser
    .save()
    .then(rec => {
      if (debug) {
        console.log('Saved user', rec);
      }
    })
    .catch(err => console.error(err.message));

  const mockVersion = {
    directions: [
      'Food qualities braise chicken cuts bowl through slices butternut snack.',
      'Tender meat juicy dinners. One-pot low heat plenty of time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee basted pork shoulder.',
      'Delicious butternut squash hunk. Flavor centerpiece plate, delicious ribs bone-in meat, excess chef end. sweet effortlessly pork, low heat smoker soy sauce flavor meat, rice fruit fruit. Romantic fall-off-the-bone butternut chuck rice burgers.',
      "Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy sauce burgers brisket. polenta mustard hunk greens.",
      'Wine technique snack skewers chuck excess. Oil heat slowly.',
    ],
    ingredients: [
      '1 happy carrot',
      '2 Turtle Doves',
      '3 French Hens',
      '4 Calling Birds',
      '5 Golden Rings',
      '6 Geese a Laying',
      '7 Swans a Swimming ',
      '8 Maids a Milking',
      '9 Ladies Dancing',
      '10 Lords a Leaping',
      '11 Pipers Piping',
      '12 Drummers Drumming ',
    ],
    notes: [
      'Cover smoker soy sauce fruit snack.',
      'Sweet one-dozen scrape delicious, non sheet raw crunch mustard.',
      'Minutes clever slotted tongs scrape, brown steem undisturbed rice.',
    ],
  };

  const recipe1 = {
    title: 'Eggs Benedict',
    img: 'eggsBenny.jpeg',
    cookingTime: 5,
    servingSize: randomBetween(1, 12),
    versions: [mockVersion],
  };

  const recipe2 = {
    title: 'Orange Miso Salmon Surprise',
    img: 'orangeSalmon.jpeg',
    cookingTime: randomBetween(5, 90),
    servingSize: randomBetween(1, 12),
    versions: [mockVersion],
  };

  const recipe3 = {
    title: 'Red Beets Winter Salad',
    img: 'redBeetSalad.jpeg',
    cookingTime: randomBetween(5, 90),
    servingSize: randomBetween(1, 12),
    versions: [mockVersion],
  };

  const recipe4 = {
    title: 'Tender Boiled Eggs',
    img: 'boiledEggs.jpeg',
    cookingTime: 7,
    servingSize: randomBetween(1, 12),
    favourite: true,
    versions: [mockVersion],
  };

  const recipe5 = {
    title: 'Pasta with Peanut Sauce',
    img: 'buckwheatPeanut.jpeg',
    cookingTime: 30,
    servingSize: randomBetween(1, 12),
    versions: [mockVersion],
  };
  const recipe6 = {
    title: 'Filled Pancakes',
    img: 'filledPancakes.jpeg',
    cookingTime: randomBetween(5, 90),
    servingSize: randomBetween(1, 12),
    versions: [mockVersion],
  };

  const recipe7 = {
    title: 'Green Quiche',
    img: 'greenQuiche.jpeg',
    cookingTime: randomBetween(5, 90),
    servingSize: randomBetween(1, 12),
    versions: [mockVersion],
  };

  const recipe8 = {
    title: 'Omas Nudelsuppe',
    img: 'noodleSoup.jpeg',
    cookingTime: randomBetween(5, 90),
    servingSize: randomBetween(1, 12),
    favourite: true,
    versions: [mockVersion],
  };
  const recipe9 = {
    title: 'Oven roasted Root Veggies',
    img: 'ovenVeggies.jpeg',
    cookingTime: randomBetween(5, 90),
    servingSize: randomBetween(1, 12),
    versions: [mockVersion],
  };

  const recipe10 = {
    title: 'Shrimp Summer Rolls',
    img: 'summerRolls.jpeg',
    cookingTime: randomBetween(5, 90),
    servingSize: randomBetween(1, 12),
    versions: [mockVersion],
  };
  const recipe11 = {
    title: "Vegetarian Shepherd's Pie",
    img: 'veggieShepardsPie.jpeg',
    cookingTime: randomBetween(5, 90),
    servingSize: randomBetween(1, 12),
    versions: [mockVersion],
  };

  const r1 = new RecipeModel(recipe1);
  const r2 = new RecipeModel(recipe2);
  const r3 = new RecipeModel(recipe3);
  const r4 = new RecipeModel(recipe4);
  const r5 = new RecipeModel(recipe5);
  const r6 = new RecipeModel(recipe6);
  const r7 = new RecipeModel(recipe7);
  const r8 = new RecipeModel(recipe8);
  const r9 = new RecipeModel(recipe9);
  const r10 = new RecipeModel(recipe10);
  const r11 = new RecipeModel(recipe11);

  const recipes = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11];

  const promiseArr = recipes.map(async recipe => {
    try {
      await recipe.save();
      // .then(rec => onlyUser.recipes.push(rec));

      if (debug) {
        console.log('Saved', recipe);
      }
    } catch (err) {
      console.error(err.message);
    }
  });

  const whatever = recipes.map(async recipe => {
    try {
      await onlyUser.recipes.push(recipe);
    } catch (err) {
      console.error(err.message);
    }
  });

  await onlyUser.save();
  // console.log(onlyUser);

  await Promise.all(whatever);

  Promise.all(promiseArr);
};

module.exports = loadDummyData;
