const uuid = require('uuid/v1');
const Version = require('./version');

module.exports = class Recipe {
  constructor(title, id, dateCreated) {
    this.title = title;
    this.id = id || `${this.title.replace(' ', '').toLowerCase()}-${uuid()}`;
    this.dateCreated = dateCreated || new Date;
    this.versions = [];

    // this.images = [] // TODO: implement an images array
  }

  addVersion(version) {
    const allItems = this.versions;
    const lastItem = allItems[allItems.length - 1];
    const lastItemsId = (lastItem && lastItem.id) || 0;
    // version.id = lastItemsId + 1;

    this.versions.push(new Version(version, (lastItemsId + 1)));
  }

  static create({ title, id, dateCreated, versions }) {
    const recipe = new Recipe(title, id, dateCreated);

    recipe.versions = versions.map(version => Version.create(version));

    return recipe;
  }
};