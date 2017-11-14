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
      HomeActions.deleteCharacter(characterId);
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
               <img src="../img/delete.png" onClick = {this.handleDelete.bind(this,character.characterId )} alt="Smiley face" height="42" width="42"/>
               <Link to={'/add/'+character.characterId +'/true/'+ character.name+'/'+character.password+'/'+character.gender}><img src="../img/edit.png" alt="Smiley face" height="30" width="30"/></Link>
             </div>
           </div>
         </div>
       );
     });

     return (
       <div className='container'>
         <div className='row'>
           {characterNodes}
         </div>
       </div>
     );
   }
 }

 export default Home;
