window.addEventListener('load', init);

const resultsElem = document.getElementById('results');

function init() {
    fetch('/api/users')
        .then(usersResp => usersResp.json())
        .then(users => {
            console.log(users);
            return Promise.all(users.map(user => 
                fetch(`https://api.github.com/users/${user.username}`).
                then(gitUserResp => gitUserResp.json())))
         })
        .then(gitUsers => {
            console.log(gitUsers);
            return gitUsers.map(gitUser => {
                const img = new Image();
                img.src = gitUser.avatar_url;
                resultsElem.appendChild(img);
                return img;
            });
        })
        .then(images => new Promise((resolve, reject) => setTimeout(resolve, 5000, images)))
        .then(images => images.forEach(img => img.remove()))
        .catch(err => console.error('Error fetching users:', err))
        .finally(() => console.log('Demo finished.'));
}