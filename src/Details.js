import React from 'react';
import axios from 'axios';
import DetailForms from './DetailForms';
import DetailViews from './DetailViews';

//this component handles form submissions 
class Details extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            games:[],
            name: '',
            developer: '', 
            genre: '',
            description: '', 
            streamerName: '',
            streamerSelect:'',
            newComment: '',
            currentGame:{},
            comments:[]
        };
        
         this.handleGameSubmit  = this.handleGameSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
         this.handleStreamerSubmit = this.handleStreamerSubmit.bind(this);
    }
    
    //this code loads up the first game when starting the app i didn't want it to, so its commented out
    // componentDidMount(){
        
    //   axios.get(`/games`).then(results =>{
    //               let games= results.data
    //               console.log(games[0].name);
    //                   this.setState({
    //                       currentGame: games[0]
    //                         // name: games[i].name,
    //                         // developer: games[i].developer, 
    //                         // genre: games[i].genre,
    //                         // description: games[i].description
    //                     });
                           
    //                       //loading comments when game changes
    //     console.log(this.state.currentGame);
    //         axios.get(`/comments/${results.data[0].name}`).then(results =>{
        
    //              this.setState({
    //                  //loading and setting them 
    //                  comments: results.data
    //              });
                 
    //         }).catch(error => console.log(error));    
    //   }); 
       
    // } 
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.current != this.props.current){
                //getting a games when choosing different game
            axios.get(`/games`).then(results =>{
                   let games= results.data
                  for (let i=0;i<games.length;i++){ 
                   if(games[i].name == this.props.current){
                       this.setState({
                           currentGame: games[i]
                        });
                   }
                   
                  }
            }).catch(error => console.log(error));
            
            //loading all comments when game changes
            axios.get(`/comments/${this.props.current}`).then(results =>{

                 this.setState({
                     //loading and setting them 
                     comments: results.data
                 });
                 
            }).catch(error => console.log(error));
        }
    }
        
        //inspired from: https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
        handleChange(event) {
            this.setState({
                [event.target.name]: event.target.value
            });
            console.log(event.target.name, event.target.value);
        }
        
        
         handleStreamerSubmit(event){
            event.preventDefault();
            
            let data = { 
                    name: this.state.streamerName
            };
        
            //let errAlert=0;
            axios.post('/streamers', data ).then(
                 //when posted comment
              
                response => {
                     console.log(response);
                     var tempCommentsArr = this.state.comments.slice();
                    
                     tempCommentsArr.push(data);
                     
                     this.props.updateStreamers();
           
                     this.setState({
                          streamerName: ''
                     });
                     
                     
                }
            ).catch(error => console.log(error));
            
            //tried using alert to tell user about their form submission but didn't implement it cuz
            // we get the warning about [Violation] 'submit' handler took 2447ms so thought its not a good way
        //   if(errAlert==1){
        //       alert("Unsuccesful, An error has occured")
        //       errAlert=0;
        //   }
        //   else{
        //       alert("Successful!");
        //   }
        }
        
        handleGameSubmit(event) {
             event.preventDefault();
            
                let data = { 
                        name: this.state.name, 
                        developer:  this.state.developer,
                        genre: this.state.genre,
                        description:  this.state.description,
                        streamerSelect: this.state.streamerSelect 
                };
        
            axios.post('/games', data ).then(
                response => {
                     var tempGamesArr = this.state.comments.slice();
                    
                     tempGamesArr.push(data);
                     
                     this.props.updateGames();
                     
                     this.setState({
                          name: '',
                          developer: '',
                          genre: '' ,
                          description: '' ,
                          games: tempGamesArr
                     });
                }
            ).catch(error => console.log(error));
        }

        handleCommentSubmit(event) {
             event.preventDefault();
           
            let data = { 
                    name: this.props.current , 
                    comment: this.state.newComment 
            };
        
            axios.post('/comments', data ).then(
                 //when posted comment
                response => {
                     console.log(response);
                     var tempCommentsArr = this.state.comments.slice();
                    
                     tempCommentsArr.push(data);
                     
                     this.setState({
                          newComment: '',
                          comments: tempCommentsArr
                     });
                }
            ).catch(error => console.log(error));
        }

     
        
        
    render(){
             
            let formProps = {
                  handleCommentSubmit:this.handleCommentSubmit,
                  handleChange:this.handleChange,
                  handleGameSubmit:this.handleGameSubmit,
                  streamers: this.props.streamers,
                  streamerSelect:this.state.streamerSelect,
                  name: this.state.name, 
                  developer:  this.state.developer,
                  genre: this.state.genre,
                  description:  this.state.description,
                  newComment:this.state.newComment,
                  streamerName:this.state.streamerName,
                  handleStreamerSubmit:this.handleStreamerSubmit
            };
                 
            let viewProps = {
                  comments:this.state.comments,
                  current: this.props.current,
                  currentGame: this.state.currentGame
            };   
            
        return <div className='details'> 
                   
                    <DetailViews {...viewProps} />
                    <DetailForms {...formProps} />
                    
                  
                </div>;

    }
}

export default Details;