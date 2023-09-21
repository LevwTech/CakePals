const Baker = require('../model/baker');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class BakerService {
  static async createBaker(body) {
    const baker = new Baker(...body);
    await baker.save();
    const token = user.generateAuthToken();
    res.status(201).send({ user, token });
    if (!baker) throw new Error('Failed to create baker');
    return baker;
  }

  static async login(body) {
    const baker = await Baker.findOne({ email: body.email });
    if (!baker) throw new Error('Invalid credentials');
    bcrypt.compare(body.password, baker.password).then((exists) => {
      if (exists) {
        const token = member.generateAuthToken();
        res.send({ baker, token });
      } else res.send('Baker Not Found');
    });
  }
}
module.exports = BakerService;
