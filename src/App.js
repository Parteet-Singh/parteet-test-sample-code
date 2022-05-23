import React from 'react';
import axios from 'axios';
import ChooseGame from './ChooseGame';
import Details from './Details';

//sets up the webpage and contains the update functions to help asychnously load all the data
class App extends React.Component{
     constructor(props){
        super(props);
        
        this.state = {
            games:[],
            streamers:[],
            current: undefined
        };
        
         this.updateStreamers  = this.updateStreamers.bind(this);
         this.updateGames = this.updateGames.bind(this);
        this.chooseGame = this.chooseGame.bind(this);
     }
    
     componentDidMount() {

        axios.get('/games').then(results =>{
          //console.log(results.data);
          //console.log(Object.keys(results.data[0].name));
          this.setState({
            games:results.data
          });
             current: results.data[0];  
         });
       
            //console.log(this.state.current); 
         
         this.updateStreamers();
             
     }
    
     updateStreamers(){
          axios.get('/streamers').then(results =>{
              this.setState({
                streamers:results.data
              });      
         });
     }
      // helper function to asynchronously requests actors for a given page
      updateGames(){
            axios.get(`/games`)
            .then(result=>{
        
              this.setState({
                games:result.data
              })
        
            })
            .catch(error=>console.log(error));
      }

      chooseGame(game) {
        //console.log(this.state.current);
        this.setState({
            current:game
        });
       
      }

      render(){
        
        let detailsProps={
            streamers:this.state.streamers ,
            current:this.state.current,
            games:this.state.games,
            updateStreamers: this.updateStreamers,
            updateGames: this.updateGames
        }
        
        let chooseGameProps={
            games:this.state.games,
            chooseGame:this.chooseGame 
        }
        
        return <>  <div className='app'>
                        <header> <h1>Game Review</h1> </header>
                        <main>
                            <ChooseGame {...chooseGameProps}/>
                            <Details {...detailsProps}/>
                            
                        </main>
                        <footer><p>Created by Parteet Singh</p></footer>
                    </div>
               </>;
      }
}

export default App;