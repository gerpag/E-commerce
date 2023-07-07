const EmailServices = require("../services/email.services");

const sendEmail = async (req, res) => {
  const { userEmail } = req.body;

  try {
    const response = await EmailServices.sendEmail(userEmail);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = { sendEmail };
