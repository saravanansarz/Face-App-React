import alt from '../alt';

class AddCharacterActions {
  constructor() {
    this.generateActions(
      'addCharacterSuccess',
      'addCharacterFail',
      'updateName',
      'updatePassword',
      'updateGender',
      'invalidName',
      'invalidGender'
    );
  }

  editCharacter(id,name, password, gender) {
    $.ajax({
      type: 'POST',
      url: '/api/editCharacter',
      data: { id: id, name: name, password: password,  gender: gender }
    })
      .done((data) => {
        this.actions.addCharacterSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addCharacterFail(jqXhr.responseJSON.message);
      });
  }

  addCharacter(name, password, gender) {
    $.ajax({
      type: 'POST',
      url: '/api/characters',
      data: { name: name, password: password,  gender: gender }
    })
      .done((data) => {
        this.actions.addCharacterSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addCharacterFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddCharacterActions);
