const API_URL = 'data.json';
const container = document.querySelector('#app');

fetch(API_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Remove placeholder
    container.querySelector('p').remove()
    data.map(function(img) {
      appendImage(img);
    });
  })
  .catch(function(err) {
    console.log('Error: ', err);
  });

let appendImage = function(data) {
  const markup = document.createElement('img');
  markup.setAttribute('src', data.img);
  markup.setAttribute('alt', data.name);

  window.setTimeout(function() {
    container.appendChild(markup);
  }, 2000);
};
