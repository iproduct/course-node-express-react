window.addEventListener('load', init);

const resultsElem = document.getElementById('results');

async function init() {
    try {
        const usersResp = await fetch('/api/users');
        const users = await usersResp.json();
        console.log(users);
        const gitUsers = await Promise.all(users.map(async user => {
            const gitUserResp = await fetch(`https://api.github.com/users/${user.username}`)
            return gitUserResp.json();
        }));
        console.log(gitUsers);
        const images = gitUsers.map(gitUser => {
            const img = new Image();
            img.src = gitUser.avatar_url;
            resultsElem.appendChild(img);
            return img;
        });
        await new Promise((resolve, reject) => setTimeout(resolve, 5000))
        images.forEach(img => img.remove());
    } catch (err) {
        console.error('Error fetching users:', err);
    } finally{
        console.log('Demo finished.')
    }
}