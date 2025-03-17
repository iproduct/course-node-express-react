const resultsDiv = document.getElementById("results");
(async function () {
    try {
        const usersResp = await fetch("users.json")
        const users = await usersResp.json()
        console.log(users)
        resultsDiv.innerHTML = users.reduce((acc, user) =>
            acc + `<li>${user.username}</li>`
            , '')
        const usernames = users.map(user => user.username)
        const gitresults = await Promise.allSettled(usernames.map(async username => {
            const resp = await fetch(`https://api.github.com/users/${username}`)
            if (resp.status >= 400) {
                throw `User with username: "${username}" does not exist`
            }
            return await resp.json()
        }))
        console.log(gitresults)
        const gitusers = gitresults.filter(res => res.status === 'fulfilled').map(res => res.value)
        rejections = gitresults.filter(res => res.status === 'rejected').map(res => res.reason).concat('; ')
        if (rejections) throw rejections
        console.log(gitusers)
        const images = gitusers.map(gituser => {
            const img = new Image()
            img.src = gituser.avatar_url
            resultsDiv.append(img)
            return img
        })
        await new Promise((resolve, reject) => setTimeout(resolve, 3000))
        images.forEach(img => img.remove())
    } catch (err) {
        console.log(err)
        resultsDiv.innerHTML = `Error Fetching Git Users: ${err}`
    }
})()