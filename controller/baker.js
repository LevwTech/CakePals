const bakerService = require('../service/baker');
module.exports = {
  registerBaker: async (req, res) => {
    try {
      const baker = await bakerService.createBaker(req.body);
      res.status(201).json(baker);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const baker = await bakerService.login(req.body);
      res.status(201).json(baker);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
