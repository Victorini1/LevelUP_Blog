const newFormHandler = async (event) => {
  event.preventDefault();

  const form = document.forms[0]
  const title = form.querySelector('input[name="post-title"]').value;
  const description = form.querySelector('input[name="post-platform"]').value;


  await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      description
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);