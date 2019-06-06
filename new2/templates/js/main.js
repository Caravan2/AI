// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const body = document.querySelector('body');



let get_sound = stext => {
  $.ajax({
    url: `https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyATHxkQvycIq5UijUvBpx7tyo0OW_zOM44`,
    type: 'POST',
    data:{
      input: {text: 'hello'},
      voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
      audioConfig: {audioEncoding: 'LINEAR16'}
    },
    success: function(sound) {
      console.log(sound)
    }

  })
}


textForm.addEventListener('submit', e => {
  e.preventDefault();
  
  $.ajax({
    url: `http://127.0.0.1:5001/margaritabot/${textInput.value}`,
    // url: `./text.txt`,
    type: 'GET',
    success: function(data) { 
      console.log(data)
      textInput.blur();
    },
    error: function() { alert('Failed!'); },
  });
});