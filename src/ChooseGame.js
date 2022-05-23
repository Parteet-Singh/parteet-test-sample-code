import React from 'react';

//displaing all the names for games to choose from
class ChooseGame extends React.Component{
     constructor(props){
        super(props);
     }
     
    render(){
 
        var games = this.props.games;
        
        return <div className='chooser'> 
                    <h2>Please Select a Game:</h2>
                    <ul>
                        {games.map(name=> <li key={name._id}><button onClick={()=>this.props.chooseGame(name.name)}>{name.name} </button> </li> )}
                    </ul>
                </div>;
    }
}

export default ChooseGame;