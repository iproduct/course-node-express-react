const resultsDiv = document.getElementById("results");
(function () {
    fetch("users.json")
        .then(usersResp => {
            return usersResp.json()
        }).then(users => {
            console.log(users)
            resultsDiv.innerHTML = users.reduce((acc, user) =>
                acc + `<li>${user.username}</li>`
                , '')
            return users.map(user => user.username)
        }).then(usernames =>
            Promise.allSettled(
                usernames.map(username =>
                    fetch(`https://api.github.com/users/${username}`)
                        .then(resp => resp.json())
                )).then(gitresults => {
                    const gitusers = gitresults
                        .filter(res => res.status === 'fulfilled')
                        .map(res => res.value)
                    console.log(gitusers)
                    return gitusers
                })
        ).then(gitusers =>
            gitusers.map(gituser => {
                const img = new Image()
                img.src = gituser.avatar_url
                resultsDiv.append(img)
                return img
            })
        ).then(images =>{
            // TODO images remove after 5 sec
        })
})()