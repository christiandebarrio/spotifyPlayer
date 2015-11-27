(function () {
  "use strick";
  var base_url = "https://api.spotify.com";

  function onSubmit (envet) {
    event.preventDefault();
    console.debug("Submitted");

    var track = {
      title: $('#js-search-input').val(),
    };

    console.log(track);

    var request = $.get(base_url + '/v1/search?type=track&query=' + track.title);

    function onSaveSuccess (response) {
      console.debug('Track searched', response);
      renderTrack(response);
    }

    function onSaveFailure (err) {
      console.error(err.responseJSON);
    }

    request.done(onSaveSuccess);
    request.fail(onSaveFailure);

  }

  $('#search-form').on('submit', onSubmit);

  function renderTrack (response) {
    var first_track = response.tracks.items[0];
    var title = first_track.name;
    var author = first_track.artists[0].name;
    var cover_url = first_track.album.images[0].url

    $('.title').text(title);
    $('.author').text(author);
    $('.cover').html('<img src="' + cover_url + '">')
    console.log(title);
    console.log(author);
    console.log(cover_url);
  }


})();