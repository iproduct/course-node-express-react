'use strict';

function init() {
    return fetch('users.json')
        .then(userResp => userResp.json())
        .then(users => Promise.all(users.map(user => 
            fetch(`https://api.github.com/users/${user.username}`)
                .then(githubResp => githubResp.json()))))
        .then(gitUsers => {
            const images = gitUsers.map(u =>{
                const image = new Image();
                image.src = u.avatar_url;
                document.body.append(image);
                return image;
            })
            return [images, gitUsers];
        }).then(imageUsers => new Promise((resolve, reject) => {
            setTimeout(resolve, 6000, imageUsers);
        })).then(([images, gitUsers]) => {
            images.forEach(img => img.remove());
            return gitUsers;
        }).catch(err => {
            console.error("!!!!" + err);
            throw err;
        });    
}

init().then(gitdata => console.log(gitdata));
