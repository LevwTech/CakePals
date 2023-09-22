const Member = require('../model/member');
const Order = require('../model/order');
const Product = require('../model/product');
const Baker = require('../model/baker');

class MemberService {
  static async createMember(body) {
    const member = new Member(...body);
    await member.save();
    const token = member.generateAuthToken();
    res.status(201).send({ member, token });
    if (!member) throw new Error('Failed to create member');
    return member;
  }

  static async login(body) {
    const member = await Member.findOne({ email: body.email });
    if (!member) throw new Error('Invalid credentials');
    bcrypt.compare(body.password, member.password).then((exists) => {
      if (exists) {
        const token = member.generateAuthToken();
        res.send({ member, token });
      } else res.send('Member Not Found');
    });
  }

  static async getMember(memberId) {
    const member = await Member.findById(memberId);
    if (!member) throw new Error('Member not found');
    return member;
  }

  static async rateOrder(memberId, orderId, rating) {
    const possibleRatings = [1, 2, 3, 4, 5];
    if (!possibleRatings.includes(rating)) throw new Error('Invalid rating');
    validateOrderIsOwnedByMember(memberId, orderId);
    Order.findByIdAndUpdate(orderId, { rating });
    const order = await findById(orderId).populate('product').exec();
    If(order.status !== "delivered")
      throw new Error('You can't rate this order yet');
    const productId = order.product._id;
    const product = await findOById(productId).populate('baker').exec();
    const bakerId = product.baker._id;
    const baker = await Baker.findOne(bakerId);
    const bakerRating = baker.rating;
    const orderCount = await Order.countDocuments({ baker: bakerId });
    const newBakerRating = (bakerRating + rating) / orderCount;
    baker.rating = newBakerRating;
    await baker.save();
  }

  static async validateOrderIsOwnedByMember(memberId, orderId) {
    const order = await Order.findById(orderId).populate('member').exec();
    const ownedByMember = order.member._id.toString() === memberId;
    if (!ownedByMember)
      throw new Error('You are not allowed to edit this order');
  }
}
module.exports = MemberService;
