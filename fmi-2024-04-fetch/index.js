fetch('users.json')
    .then(response => response.json())
    .then(users => {
        console.log(users);
        const gitUserPromises = users.map(user =>
            fetch(`https://github.com/users/${user.username}`)
                .then(userResp => userResp.json()));
        Promise.allSettled(gitUserPromises)
            .then(gitUserResults => {
                const gitUsers = gitUserResults.filter(gitUser => gitUser.status === 'fulfilled')
                    .map(gitUser => gitUser.value)
                console.log(gitUsers)
                if (gitUsers.length === 0) {
                    throw 'No users fetched'
                }

                return gitUsers.map(gitUser => {
                    const img = new Image();
                    img.src = gitUser.avatar_url;
                    document.getElementById('results').appendChild(img);
                    return img;
                });
            })
            .then(images =>new Promise(resolve => setTimeout(resolve, 5000, images))            )
            .then(images => {
                images.forEach(img => img.remove());
            }).catch(err => {
                console.log(`Error:`, err);
                document.getElementById('results').innerHTML = `<h2>Error: ${err}</h2>`
            })
            .finally(() => console.log('Demo finished.'))
        });

