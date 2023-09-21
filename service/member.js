const Member = require('../model/member');

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
}
module.exports = MemberService;
