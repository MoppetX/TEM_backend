const mongoose = require('mongoose');
// const fs = require('fs');
const { recipeModelErrorMsgs: errMsgs } = require('./modelErrorMsgs');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, errMsgs.TITLE.REQUIRED],
    minlength: [2, errMsgs.TITLE.TOO_SHORT],
    maxlength: [40, errMsgs.TITLE.TOO_LONG],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  images: {
    large: {
      type: Array,
      default: ['default.jpeg'],
    },
    thumb: {
      type: String,
      default: 'default.jpeg',
    },
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  cookingTime: {
    type: Number,
    default: 1,
  },
  servingSize: {
    type: Number,
    default: 1,
  },
  versions: [
    {
      type: Object,
    },
  ],
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
});

const RecipeModel = mongoose.model('recipe', RecipeSchema);

module.exports = RecipeModel;
