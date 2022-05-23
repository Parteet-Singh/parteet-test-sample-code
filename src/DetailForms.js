import React from 'react';

//contains all  the forms 
//returns all the forms used for the project
class DetailForms extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return <> 
                
                    <div className='submitCommentForm column'>
                        <h2>Add Comment</h2>
                        <form onSubmit={this.props.handleCommentSubmit}>
                         
                             <label htmlFor="newComment" className='visuallyhidden'>
                                Submit a comment:
                             </label>
                            <textarea name="newComment" id="newComment" onChange={this.props.handleChange}
                            value={this.props.newComment} required></textarea>
                             <input type='submit' value='Submit Comment' />
                        </form>
                    </div>
                    
                     <div className='submitStreamerForm column'>
                        <h2>Add Streamer</h2>
                        <form onSubmit={this.props.handleStreamerSubmit}>
                            <label htmlFor="streamerName" className='visuallyhidden'>
                                Enter name of new Streamer:
                            </label>
                             <input type="text" name="streamerName" id="streamerName" value={this.props.streamerName} onChange={(event)=>this.props.handleChange(event)} required />
                            <input type="submit" value="Submit Streamer" />
                        </form>  
                        
                    </div>   
                
                
                    <div className='submitGameForm'>
                      <h2>Add Game</h2>
                      <p>Required Fields are marked with an Asterisk(*)</p>
                        <form onSubmit={(event)=>this.props.handleGameSubmit(event)}>
                            <label>
                                Enter Game Name*:
                                <input type="text" name="name" value={this.props.name} onChange={(event)=>this.props.handleChange(event)} required/>
                            </label>
                            <label>
                                Enter Developer*:
                                <input type="text" name="developer" value={this.props.developer} onChange={(event)=>this.props.handleChange(event)} required/>
                            </label>
                            <label>
                                Enter Genre*:
                                <input type="text" name="genre" value={this.props.genre} onChange={(event)=>this.props.handleChange(event)} required/>
                            </label>
                            <label>
                                Enter Description*:
                                <input type="text" name="description" value={this.props.description} onChange={(event)=>this.props.handleChange(event)} required/>
                            </label>
                            <label>
                                  Choose a Streamer:
                                  <select name="streamerSelect" onChange={event=>this.props.handleChange(event)}>
                                    <option value=''>None</option>
                                    {this.props.streamers.map(streamer=><option key={streamer.name} value={streamer.name}>{streamer.name}</option>)}
                                  </select>
                            </label>
                            <input type="submit" value="Submit Game" />
                        </form>
                    </div>    
                    
                
                    
            </>;
    }
}

export default DetailForms;