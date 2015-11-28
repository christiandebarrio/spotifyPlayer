(function () {
  "use strick";
  var base_url = "https://api.spotify.com";

  function resetPlayer () {
    $('.js-audio').trigger('stop');
    $('.btn-play').addClass('disabled');
    $('.btn-play').removeClass('playing');   
    $('progress').val('0');
  }

  function onSubmit (envet) {
    event.preventDefault();
    console.debug("Submitted");
    
    var track = {
      title: $('#js-search-input').val(),
    };

    console.log(track);

    var request = $.get(base_url + '/v1/search?type=track&query=' + track.title);

    function onSaveSuccess (response) {
      console.debug('Tracks list searched', response);
      resetPlayer();
      showTrack(response);
    }

    function onSaveFailure (err) {
      console.error(err.responseJSON);
    }

    request.done(onSaveSuccess);
    request.fail(onSaveFailure);

  }

  $('#search-form').on('submit', onSubmit);

  function showTrack (tracks_result) {
    var first_track = tracks_result.tracks.items[0];
    var title = first_track.name;
    var artist = first_track.artists[0];
    var cover_url = first_track.album.images[0].url;
    var preview_url = first_track.preview_url;

    $('.js-title').text(title);
    $('.js-artist').text(artist.name);
    $('.js-artist').attr("data-id", artist.id)
    $('.js-cover').html('<img src="' + cover_url + '">');
    $('.js-audio').attr('src', preview_url);
    console.log(title);
    console.log(artist.name + 'id: ' + artist.id);
    console.log('Image: ' + cover_url);
    console.log('Preview audio: ' + preview_url);
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

  function requestArtistInfo (event) {
    event.preventDefault();
    var artist_id = $('.js-artist').data('id');
    var artist_url = '/v1/artists/' + artist_id;
    // var albums_url = '/v1/artists/' + artist + '/albums';

    var request = $.get(base_url + artist_id);

    function onSaveSuccess (response) {
      getArtistAlbums(response);
      console.debug('Artist searched', response);
    }

    function onSaveFailure (err) {
      console.error(err.responseJSON);
    }

    request.done(onSaveSuccess);
    request.fail(onSaveFailure);
  }

  function printArtistInfo (artist) {

  }

  function requestArtistAlbums (artist) {
    var albums = [];
    artis.items.map(function (album) {
      if(albums.indexOf(album.name) === -1){
        return albums.push(album.name);
      };
    }); 

    console.log("Albums :" + albums);

    $('.modal').modal('show');
  }


  $(".js-artist").on('click', requestArtistInfo);


})();