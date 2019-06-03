const FeedbackModel = require("../models/feedback.model");
const mailer = require('./mailer');

module.exports.insert = async (name, email, message) => {
  try {
    const result = await new FeedbackModel({
      name: name,
      email: email,
      message: message
    }).save();
    if(!!email){
        mailer.sendMail(
            email,
            'Thank you for your valuable information.',
            'Please use this for further communication email2rishi13@gmail.com',
            '<h2>Stay hungry.Stay foolish.'
        )
    }
   
    return result;
  } catch (e) {
    throw e;
  }
};

module.exports.fetch = async () => {
   
     return await FeedbackModel.find((err, res) => {
          if(err) throw err;
          return res;
       
      })
    
  };
