import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.state.message = "";
    HomeStore.listen(this.onChange);
    HomeActions.getTwoCharacters();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleDelete(characterId,event) {
      HomeActions.deleteCharacter(this,characterId);
  }

  render() {
     var characterNodes = this.state.characters.map((character, index) => {
       return (
         <div key={character.characterId} className='col-xs-6 col-sm-6 col-md-5 col-md-offset-1'>
           <div className='thumbnail fadeInUp animated'>
             <div className='caption text-center'>
               <h4>
                 <Link to={'/characters/' + character.characterId}><strong>{character.name}</strong></Link>
               </h4>
               <ul className='list-inline'>
                 <li><strong>Gender:</strong> {character.gender}</li>
               </ul>
                <div className='row'>
               <span className='col-md-6'   > <img src="../img/delete.png" onClick = {this.handleDelete.bind(this,character.characterId )} alt="Smiley face" height="50" width="50"/></span>
               <Link className='col-md-6'  to={'/add/'+character.characterId +'/true/'+ character.name+'/'+character.password+'/'+character.gender}><img src="../img/edit.png" alt="Smiley face" height="40" width="40"/></Link>
             </div>
             </div>
           </div>
         </div>
       );
     });

     return (
       <div className='container'>
         <div className="alert alert-info fade in">{ this.state.message}</div>
         <div className='row'>
           {characterNodes}
         </div>
       </div>
     );
   }
 }

 export default Home;
