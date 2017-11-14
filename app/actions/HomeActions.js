import alt from '../alt';
class HomeActions {
  constructor() {
    this.generateActions(
      'getTwoCharactersSuccess',
      'getTwoCharactersFail',
      'getDeleteSuccess'
    );
  }

deleteCharacter(scope,characterId,event) {
    $.ajax({
      type: 'POST',
      url: '/api/deleteCharacter',
      data: { characterId: characterId}
    })    .done(data => {
          this.actions.getDeleteSuccess(data);
        })
        .fail(jqXhr => {
          this.actions.getTwoCharactersFail(jqXhr.responseJSON.message);
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
