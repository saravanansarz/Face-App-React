import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getTwoCharactersSuccess',
      'getTwoCharactersFail'
    );
  }

  deleteCharacter(characterId) {
    $.ajax({
      type: 'POST',
      url: '/api/deleteCharacter',
      data: { characterId: characterId}
    });
  }

  getTwoCharacters() {
    $.ajax({ url: '/api/characters' })
      .done(data => {
        this.actions.getTwoCharactersSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getTwoCharactersFail(jqXhr.responseJSON.message);
      });
  }

}

export default alt.createActions(HomeActions);
