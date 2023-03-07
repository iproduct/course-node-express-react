
async function init() {
    const resp = await fetch('http://localhost:9000/api/posts');
    const posts = await resp.json();
    const items = posts.reduce((acc, post) => acc + `<li>${post.id}: ${post.title} -- by ${post.author}</li>\n`, '');
    document.getElementById('results').innerHTML = `<ul>${items}</ul>`;
}

window.addEventListener('load', init);