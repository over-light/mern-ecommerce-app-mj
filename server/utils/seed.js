
const bcrypt = require('bcryptjs');

const setupDB = require('../config/db');
const { ROLES } = require('../constants');
const User = require('../modules/user/user.model');

const args = process.argv.slice(2);
const email = args[0];
const password = args[1];

// eslint-disable-next-line consistent-return
const seedDB = async () => {
  try {
    console.log('seed db started');

    if (!email || !password) throw new Error('missing arguments');

    const user = new User({
      email,
      password,
      firstName: 'admin',
      lastName: 'admin',
      mobile:1234567890,
      isActive:true,
      role: ROLES.Admin
    });

    const existingUser = await User.findOne({ email: user.email });
    console.log('existingUser', existingUser);
    if (existingUser) throw new Error('user collection is seeded!');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    await user.save();

    console.log('seed db finished');
  } catch (error) {
    console.log('error while seeding database');
    console.log(error);
    return null;
  }
};

(async () => {
  await setupDB().then(async () => {
    await seedDB();
  });
})();
