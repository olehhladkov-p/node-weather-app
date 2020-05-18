const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('.message-one');
const messageTwo = document.querySelector('.message-two');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  const address = e.target.querySelector('[name="address"]').value;

  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then(({ error, location, forecast }) => {
      if (error) {
        messageOne.textContent = error;

        return;
      }

      messageOne.textContent = location;
      messageTwo.textContent = forecast;
    });
  });

  return;
});
