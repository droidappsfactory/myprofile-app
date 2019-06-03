
const httpStatus = require('http-status');
const feedbackService = require('../services/feedbackService.service');

module.exports.saveFeedback = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        console.log('data from service ',name , email, message)
        // const response = await communityService.createJoinCommunityRequest(User, partnerId, communityId);
        // if (response.message === 'Already Requested') {
        //     res.status(httpStatus.ALREADY_REPORTED).json(response);
        // } else {
        //     res.status(httpStatus.OK).json(response);
        const returnValue = await feedbackService.insert(name,email,message)
        // }
        res.status(httpStatus.OK).json({result:returnValue})
    } catch (e) {
        next(e);
    }
    
}

module.exports.getFeedbacks = async (req, res, next) => {
    try {
        const name = req.params.name;
        const result = await feedbackService.fetch();
        res.status(httpStatus.OK).json({result:result, name: name});
    } catch(e) {
        next(e);
    }
}