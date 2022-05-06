const signupFormHandler = async (event) => {
  event.preventDefault();

  const usernameCreate = document.querySelector('#username-input-signup');
  const passwordCreate = document.querySelector('#password-input-signup');
  const emailCreate = document.querySelector('#email-input-signup');
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameCreate.value,
      email:   emailCreate.value,
      password: passwordCreate.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert('Whoops your sign up failed, try again!');
  }
};


document.querySelector('#signup-form')
document.addEventListener('submit', signupFormHandler);
