(function () {
  "use strick";
  var base_url = "https://api.spotify.com";

  function resetForNewSearch () {
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
      resetForNewSearch();
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
    var artist_id = $('.js-artist').attr('data-id');
    var artist_url = '/v1/artists/' + artist_id;
    

    var request = $.get(base_url + artist_url);

    function onSaveSuccess (response) {
      printArtistInfo(response);
      console.debug('Artist searched', response);
    }

    function onSaveFailure (err) {
      console.error(err.responseJSON);
    }

    request.done(onSaveSuccess);
    request.fail(onSaveFailure);
  }

  function printArtistInfo (artist) {
    var name = artist.name;
    var image_url = artist.images[1].url;
    var followers = 'Followers: ' + artist.followers.total;
    var popularity = 'Popularity: ' + artist.popularity;

    $('.js-photo-artist').attr('src', image_url);
    $('.js-artist-name').text(name);
    $('.js-artist-socialdata').html(popularity + '&nbsp&nbsp&nbsp-&nbsp&nbsp&nbsp' + followers);

    console.log('name: ' + name);
    console.log('image_url: ' + image_url);
    console.log('followers: ' + followers);
    console.log('popularity: ' + popularity);


    $('.modal').modal('show');
  }

  // function requestArtistAlbums (artist) {
  //   var artist_id = $('.js-artist').data('id');
  //   var albums_url = '/v1/artists/' + artist_id + '/albums';
  //   var albums = [];
  //   artist.items.map(function (album) {
  //     if(albums.indexOf(album.name) === -1){
  //       return albums.push(album.name);
  //     };
  //   }); 

  //   console.log("Albums :" + albums);

  //   $('.modal').modal('show');
  // }


  $(".js-artist").on('click', requestArtistInfo);


})();