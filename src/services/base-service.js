const mongoose = require('mongoose');

module.exports = class Service {
  constructor(model) {
    this.model = model;
  }

  update(query, update) {
    return this.model.updateOne(query, update);
  }

  findAll() {
    return this.model.find();
  }

  add(item) {
    return this.model.create(item);
  }

  async deleteById(id) {
    await this.model.findById(id, async function(err, document) {
      if (err) return err;
      if (document.deleted) {
        return 'already deleted';
      }
      document.deleted = true;

      // return await document.save();
      await document.save(function(err, doc) {
        if (err) return err;
        console.log('BASE_SERVICE ---------------------');
        console.log(doc);
        return doc;
      });
    });
  }

  delete(query) {
    return this.model.deleteMany(query);
  }

  findById(id) {
    return this.model.findById(id);
  }

  find(query) {
    return this.model.find(query);
  }

  // async saveAll() {
  //   return this.model.findA();
  // }
};

// mongoose query options
//
// Model.deleteMany()
// Model.deleteOne()
// Model.find()
// Model.findById()
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndRemove()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()
