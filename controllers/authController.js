const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { hashPassword, verifyHash } = require("../helpers/hashing");
const jwt = require("jsonwebtoken");
const {
  findBroker,
  createBroker,
  findBrokerWithId,
  updateBrokerPassword,
  updateBrokerProfile,
} = require("../services/brokerService");
const { totalPropertyCount } = require("../services/propertyService");
const { totalClientCount } = require("../services/clientService");

const registerBroker = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  // res.send("Register Broker");
  const { username, email, password } = req.body;
  try {
    let broker = await findBroker(email);
    if (broker) {
      return res.status(400).json({
        errors: [{ message: " User with that email already exists" }],
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await createBroker(username, email, hashedPassword);
    return res.send(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
});

const loginBroker = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let broker = await findBroker(email);
    console.log(broker);
    if (!broker) {
      return res
        .status(400)
        .json({ errors: [{ message: "User with that email not exists" }] });
    }
    const isMatch = await verifyHash(password, broker.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: "Password incorrect" }] });
    }
    const payload = {
      user: {
        id: broker.dataValues.id,
      },
    };
    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    return res.status(500).send("Server error", err);
  }
});

const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.user.id;
    const { oldPassword, newPassword } = req.body;
    let broker = await findBrokerWithId(userId);
    if (!broker) {
      return res
        .status(400)
        .json({ errors: [{ message: "User does not exists" }] });
    }
    let isMatch = await verifyHash(oldPassword, broker.dataValues.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: "Please enter correct old password" }] });
    }
    let newHashedPassword = await hashPassword(newPassword);
    await updateBrokerPassword(userId, newHashedPassword);
    return res.send({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
};

const getProfileDetails = async (req, res, next) => {
  try {
    const userId = req.user.user.id;
    let broker = await findBrokerWithId(userId);
    console.log(broker);
    // let profileDetails={};
    if (!broker) {
      return res
        .status(400)
        .json({ errors: [{ message: "User does not exists" }] });
    }
    let propertyCount = await totalPropertyCount(userId);
    let clientCount = await totalClientCount(userId);

    return res.send({
      message: "Details fetched successfully",
      data: { broker, propertyCount, clientCount },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const userId = req.user.user.id;
    const { username, imageUrl } = req.body;
    let broker = await findBrokerWithId(userId);
    if (!broker) {
      return res
        .status(400)
        .json({ errors: [{ message: "User does not exists" }] });
    }

    await updateBrokerProfile(username, imageUrl, userId);
    return res.status(200).json({ message: "Profile Updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error", err);
  }
};

module.exports = {
  registerBroker,
  loginBroker,
  changePassword,
  getProfileDetails,
  editProfile
};
