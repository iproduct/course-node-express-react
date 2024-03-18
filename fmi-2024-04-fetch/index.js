fetch('users.json')
    .then(response => response.json())
    .then(users => {
        console.log(users);
        const gitUserPromises = users.map(user =>
            fetch(`https://api.github.com/users/${user.username}`)
                .then(userResp => userResp.json()));
        Promise.allSettled(gitUserPromises)
            .then(gitUserResults => {
                const gitUsers = gitUserResults.filter(gitUser => gitUser.status === 'fulfilled')
                    .map(gitUser => gitUser.value)
                console.log(gitUsers)

                // TODO: Show pictures (avatar_url)
            })
    });

