const resultsDiv = document.getElementById('results');
fetch('users.json')
    .then(usersResp => usersResp.json())
    // .then(users => { 
        // resultsDiv.innerHTML = 
        // '<ul>' +
        // users.map(user => `<li>${user.username}</li>`)
        // .join("<br>") 
        // + '</ul>';
        // return users;
    // })
    .then(users => {
        console.log(users);
        return Promise.allSettled(users.map(user => fetch(`https://api.github.com/users/${user.username}`)
            .then(gitUserResp => gitUserResp.json())
        )).then(usersData => {
            console.log(usersData);
            const gitUsers = usersData.filter(usersData => usersData.status === 'fulfilled')
                .map(usersData => usersData.value)
            const gitUserImages = gitUsers.map(gitUser => {
                const img = new Image();
                img.src = gitUser.avatar_url;
                resultsDiv.append(img)
                return img;
            })
            return gitUserImages;
        })
    }).then(images => new Promise(resolve =>
        setTimeout(() => resolve(images), 10000)
    )).then(images =>{
        images.forEach(img => {
            img.remove();
        });
    })
