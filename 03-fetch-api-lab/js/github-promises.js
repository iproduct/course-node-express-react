'use strict'

function init() {
    const resultsElem = document.getElementById("results");
    fetch("users.json")
        .then(usersResp => usersResp.json())
        .then(users => {
            console.log(users);
            return Promise.allSettled(
                users.map(user => fetch(`https://api.github.com/users/${user.username}`)
                    .then(resp => resp.json())
                )
            );
        }).then(gitUsers =>
            gitUsers.filter(gitUser => gitUser.status === 'fulfilled')
                .map(gitUser => {
                    console.log(gitUser.value);
                    const img = new Image();
                    img.src = gitUser.value.avatar_url;
                    resultsElem.appendChild(img);
                    return img;
                })
        ).then(images => new Promise((resolve, reject) => setTimeout(resolve, 10000, images)))
        .then(images => images.forEach(img => img.remove()))
        .finally(()=> console.log("Demo finished."));
}

init();
