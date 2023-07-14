const Membership = require('../models/membership');

exports.createMembership = (req, res, next) => {
    console.log("membership Post test");
    const membershipObject = req.body;
    // console.log(membershipObject);
    const m = new Membership({
        ...membershipObject
    });
    m.save()
    .then(() => res.status(201).json({message: 'Post saved!'}))
    .catch(error => res.status(400).json({error}));
};

exports.getMembershipOfUser = (req, res, next) => {
    console.log("Get membership of user");
    Membership.find({user_id: req.params.id}) //id is the user_id
    .then(membership => res.status(200).json(membership))
    .catch(error => res.status(404).json({error}));
};

exports.updateMembership = (req, res, next) => {
    console.log("update membership");
    const membershipObject = req.body;
    //Check credit prerequisites
    if(isNaN(membershipObject.credit)){
        membershipObject.credit = 0;
    }
    if(membershipObject.credit == ""){
        membershipObject.credit = 0;
    }
    if(membershipObject.credit < 0){
        membershipObject.credit = 0;
    }
    Membership.updateOne({_id: req.params.id}, {...membershipObject, _id: req.params.id}) //id is the membership_id
    .then(() => res.status(200).json({message: 'Update saved!'}))
    .catch(error => res.status(400).json({error}));
};

exports.deleteMembership = (req, res, next) => {
    console.log("delete membership");
    Membership.deleteOne({_id: req.params.id}) //id is the membership_id
    .then(() => res.status(200).json({message: 'Delete saved!'}))
    .catch(error => res.status(400).json({error}));
};
