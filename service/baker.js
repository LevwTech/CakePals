const Baker = require('../model/baker');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class BakerService {
  static async createBaker(body) {
    const baker = new Baker(...body);
    await baker.save();
    const token = baker.generateAuthToken();
    res.status(201).send({ baker, token });
    if (!baker) throw new Error('Failed to create baker');
    return baker;
  }

  static async login(body) {
    const baker = await Baker.findOne({ email: body.email });
    if (!baker) throw new Error('Invalid credentials');
    bcrypt.compare(body.password, baker.password).then((exists) => {
      if (exists) {
        const token = baker.generateAuthToken();
        res.send({ baker, token });
      } else res.send('Baker Not Found');
    });
  }

  static async getBakerProfile(bakerId) {
    const baker = await Baker.findById(bakerId);
    if (!baker) throw new Error('Baker not found');
    return baker;
  }
}
module.exports = BakerService;
