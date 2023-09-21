const memberService = require('../service/member');
module.exports = {
  registerMember: async (req, res) => {
    try {
      const member = await memberService.createMember(req.body);
      res.status(201).json(member);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const Member = await memberService.login(req.body);
      res.status(201).json(Member);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
