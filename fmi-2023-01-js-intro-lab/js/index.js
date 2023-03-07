let posts = [];

async function init() {
    const resp = await fetch('http://localhost:9000/api/posts');
    posts = await resp.json();
    showPosts();
}

function showPosts() {
    const items = posts.reduce((acc, post) => acc + `<li>${post.id}: ${post.title} -- by ${post.author}</li>\n`, '');
    document.getElementById('results').innerHTML = `<ul>${items}</ul>`;
}

async function addPost(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const resp = await fetch('http://localhost:9000/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
    });
    const post = await resp.json();
    if (resp.status === 201) {
        posts = posts.concat(post);
    }
    showPosts();
}

window.addEventListener('load', init);
const form = document.getElementById('add-post');
form.addEventListener('submit', addPost);