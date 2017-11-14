import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.characters = [];
    this.message = "";
  }

  onGetTwoCharactersSuccess(data) {
    this.characters = data;
  }
  onGetDeleteSuccess(data) {
    this.message = data.message;
  }

  onGetTwoCharactersFail(errorMessage) {
    toastr.error(errorMessage);
  }

}

export default alt.createStore(HomeStore);
