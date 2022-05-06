const morebtn = $('#morebutton');


const randommessage = () => {
  const messages = ['Welcome! Add some posts!', 'Ideas? Share some', "Make some friends, share some laughs",'Remember the Golden Rule']
  let message = messages[Math.floor(Math.random()*messages.length)];
  $('#randommsg').text(message);
}


const moreButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      
    }
  }
};


randommessage();