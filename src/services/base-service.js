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
    try {
      const document = await this.model.findById(id);
      if (document.deleted) {
        return {
          message: 'already deleted',
          document,
        };
      }
      document.deleted = true;
      return await document.save();
    } catch (err) {
      return err;
    }
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
