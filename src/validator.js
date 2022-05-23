const {check} = require('express-validator');

const toUppercase= value=>{
    return value.toUpperCase();
};

exports.gameValidator = [
    //validating the Game
    check('name', 'please enter a valid name!').trim().escape().isLength({min:1 ,max:30}).not().isEmpty(),
    check('developer', 'please enter a valid developer!').trim().escape().isLength({min:1 ,max:20}).not().isEmpty().customSanitizer(toUppercase),
    check('genre', 'please enter a valid genre!').trim().escape().isLength({min:1 ,max:20}).not().isEmpty().customSanitizer(toUppercase),    
    check('description', 'please enter a valid description!').trim().escape().isLength({min:1 ,max:50}).not().isEmpty(),
    check('streamerSelect', 'please enter a valid streamer').trim().escape()
];

exports.gameCommentsValidator= [
     check('name', 'please enter a valid name!').trim().escape().isLength({min:1 ,max:30}).not().isEmpty(),
       check('comment', 'please enter a valid comment!').trim().escape().isLength({min:1 ,max:30}).not().isEmpty()
];

exports.streamerValidator = [
     check('name', 'please enter a valid name!').trim().escape().isLength({min:1 ,max:30}).not().isEmpty()
];