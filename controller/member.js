const memberService = require('../service/member');
const productService = require('../service/product');

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
  /*
  This endpoint lists the products for the member based on the member's location. 
  It finds all the bakers near the member, and if the member has specified a type,
  it will filter the products based on the type.
  */
  listProducts: async (req, res) => {
    try {
      const memberId = req.member._id;
      const { type } = req.body;
      const member = await memberService.getMember(memberId);
      const location = member.address;
      const products = await productService.listProducts(location, type);
      res.status(200).json({
        message: 'Products has been sent successfully',
        data: products,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
