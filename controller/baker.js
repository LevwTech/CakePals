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
  getBakerProfile: async (req, res) => {
    try {
      const { bakerId } = req.params;
      const baker = await bakerService.getBakerProfile(bakerId);
      res.status(201).json({
        message: 'Baker profile has been sent successfully',
        data: baker,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
