const express = require('express');
const app = express();

const connection = require('./db/connection');

const GameComment = require('./models/GameComment');
const Game= require('./models/Game');
const Streamer= require('./models/Streamer');

const{validationResult} = require('express-validator');
const {gameValidator} = require(__dirname +  "/src/validator.js");
const {gameCommentsValidator} = require(__dirname +  "/src/validator.js");
const {streamerValidator}  = require(__dirname +  "/src/validator.js");


app.use(express.static('public'));
app.use(express.json());

app.get('/favicon.ico', (req,res) =>{
    res.status(204).end();
});

//getting comments about the game
app.get('/comments/:game', (req,res)=>{

    GameComment.find({'name':req.params.game})
    .then(results=>{

        res.send(results);
    })
    .catch(error=>res.send(error));

});

//getting all the games
app.get('/games', (req,res)=>{
    Game.find().populate('streamers').exec((error, result) => {
            if (error) {
                res.status(500).send(error);
            } else {
                if (!result) {
                    res.status(404).send("No Games found");
                } else {
                    res.send(result);
                    console.log(result);
                }
            }
    });
});


//getting all streamers
app.get('/streamers', (req,res)=>{
    Streamer.find().exec((error, result) => {
            if (error) {
                res.status(500).send(error);
            } else {
                if (!result) {
                    res.status(404).send("No Streamers found");
                } else {
                    res.send(result);
                    //console.log(result);
                }
            }
    });
});

//posting comments
app.post('/comments', gameCommentsValidator , (req,res)=>{
    
    const valErrors = validationResult(req).array();
    
     if(valErrors.length !=0) {
        res.status(404).send(valErrors);
     } 
     else{
            let comment = new GameComment(req.body);

            comment.save()
            .then(result=>{
               res.send(comment);
            })
            .catch(error=>res.send("An error has occured"));
     }
});

//posting games
app.post('/games', gameValidator , (req,res)=>{

    const valErrors = validationResult(req).array();
    
    if(valErrors.length !=0) {
        res.status(404).send(valErrors);
    } else{
            let game = new Game(req.body);
            
            //referencing the game to the streamer
            if( req.body.streamerSelect != ''){ 
                 Streamer.findOne({"name": req.body.streamerSelect})
                 .exec((error, result) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    if (!result) {
                        res.status(404).send("No Streamer with that name found!");
                    } else {
                        // console.log("107",game)
                        // console.log(result);
                        game.streamers.push(result);
                        game.save().then(result => {
                              res.status(201).send(result);
                            //   console.log(result)
                        }).catch( ()=>{
                             res.status(404).send("An error has occured");
                        });
                    }
                }
             });   
            }
            else{
                game.save().then(result => {
                      res.status(201).send(result);
                }).catch( ()=>{
                     res.status(404).send("An error has occured");
                });
            }
    }
});

//posting the streamer
app.post('/streamers', streamerValidator , (req,res)=>{

    const valErrors = validationResult(req).array();
    
    if(valErrors.length !=0) {
        res.status(404).send(valErrors);
    } else{
            let streamer = new Streamer(req.body);
            
            streamer.save().then(result => {
                  res.status(201).send(result);
            }).catch( ()=>{
                 res.status(404).send("An error has occured");
            });
    }
});

//error handling middleware
app.use((error, req, res, next)=>{
    if(error.status==404){
        res.render('error', {
            title: "Error: 404",
            message: "There is nothing here!"
        });
    } else{
        res.render('error', {
            title: "Unknown Error",
            message: "An error has occured!"
        });
    }
});

connection.once('open', ()=>{

    console.log('Connected to DB');

    const server = app.listen( process.env.PORT || 8080, ()=>{
        console.log('Listening on 8080');
    });
    
});
