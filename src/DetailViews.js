import React from 'react';

// Basically displays informaation for the game and its comments  

class DetailViews extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){ 
        return <> 
                  <div className='gameInformation'>    
                       <div className= 'detailsGame'>
                            <h2>About: {this.props.current}</h2>
                            
                             <ul>
                                   <li>Name: {this.props.currentGame.name}</li>
                                   <li>Developer: {this.props.currentGame.developer}</li>
                                   <li>Genre: {this.props.currentGame.genre}</li>
                                   <li>Description: {this.props.currentGame.description}</li>
                             </ul>
                     
                       </div>
                      
                       <div className='comments'>
                        <h2>Users Comments: {this.props.current}</h2>
                        <ul>
                            {this.props.comments.map(name => <li key={name._id}> {name.comment} </li> )}
                        </ul>
                       </div>
                    </div>
              </>;
    }
}

export default DetailViews;
