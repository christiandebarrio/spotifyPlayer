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
    var cover_url = first_track.album.images[0].url;
    var preview_url = first_track.preview_url;

    $('.js-title').text(title);
    $('.js-author').text(author);
    $('.js-cover').html('<img src="' + cover_url + '">');
    $('.js-audio').attr('src', preview_url);
    console.log(title);
    console.log(author);
    console.log(cover_url);
    console.log(preview_url);
  }

  function play () {
    if($('.btn-play').hasClass('disabled')) {
      $('.js-audio').trigger('play');
    } else {
      $('.js-audio').trigger('pause');
    };
    $('.btn-play').toggleClass('disabled');
    $('.btn-play').toggleClass('playing');
  }

  $('.btn-play').on('click', play);

  function timeupdate () {
    var current = $('.js-audio').prop('currentTime');
    $('progress').val(current);
  }

  $(".js-audio").on('timeupdate', timeupdate);
})();