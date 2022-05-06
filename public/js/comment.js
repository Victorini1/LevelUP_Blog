async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('#comment').value.trim();
  console.log(comment_text)

  const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];
  console.log(post_id);

  if (comment_text) {
      const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
             post_id: post_id,
             text: comment_text
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          document.location.reload();

      } else {
          alert(response.statusText);
          document.querySelector('#comment-form').style.display = "block";
      }
  }
}

document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);


async function deletePost(event) {
  event.preventDefault();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

  console.log(post_id);

  if (comment) {
      const response = await fetch(`/api/posts/${post_id}`, {
          method: 'DELETE',
          body: JSON.stringify({
            post_id: post_id
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          document.location.replace('/');

      } else {
          alert(response.statusText);
      }
  }
}

document.querySelector('#delete').addEventListener('click', deletePost);
