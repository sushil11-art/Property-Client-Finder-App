const bcrypt = require("bcryptjs");

const hashPassword = async (plainText) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword= await bcrypt.hash(plainText, salt);
  return hashedPassword;
};

const verifyHash = async (plainText, hash) => {
  const result = await bcrypt.compare(plainText, hash);
  return result;
};

module.exports = {
  hashPassword,
  verifyHash,
};
