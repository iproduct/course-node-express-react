function demo() {
    const resultsElem = document.getElementById("results")
    fetch('users.json')
        .then(usersResp => usersResp.json())
        .then(users => {
            console.log(users);
            return Promise.all(users.map(user => {
                return fetch(`https://api.github.com/users/${user.username}`)
                    .then(usersResp => usersResp.json());
            }));
        })
        .then(gitUsers => {
            console.log(gitUsers);
            const images = gitUsers.map(gitUser => {
                const img = new Image();
                img.src = gitUser.avatar_url
                resultsElem.appendChild(img);
                return img;
            })
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 5000, images)
            });
        }).then(images => {
            images.forEach(img => resultsElem.removeChild(img));
        })
        .finally(() => console.log("Demo finished."));
}

demo()