let posts = [];

async function init() {
    const resp = await fetch('http://localhost:9000/api/posts', {
        headers: {
            'Accept': 'application/json'
        }
    });
    newPosts = await resp.json();
    updatePosts(newPosts);
}

function updatePosts(newPosts) {
    if (posts !== newPosts) {
        posts = newPosts;
        const items = posts.reduce((acc, post) => acc + `<li>${post.id}: ${post.title} -- by ${post.author}</li>\n`, '');
        document.getElementById('results').innerHTML = `<ul>${items}</ul>`;
    }
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
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
        newPosts = posts.concat(post);
        updatePosts(newPosts);
        clearForm();
    }
}

window.addEventListener('load', init);
const form = document.getElementById('add-post');
form.addEventListener('submit', addPost);