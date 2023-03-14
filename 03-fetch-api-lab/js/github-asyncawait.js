'use strict'

async function init() {
    const resultsElem = document.getElementById("results");
    try {
        const usersResp = await fetch("users.json");
        const users = await usersResp.json();
        console.log(users);
        const gitUsers = await Promise.allSettled(
            users.map(async user => {
                const resp = await fetch(`https://api.github.com/users/${user.username}`);
                resp.json();
            })
        );
        const images = gitUsers.filter(gitUser => gitUser.status === 'fulfilled')
            .map(gitUser => {
                console.log(gitUser.value);
                const img = new Image();
                img.src = gitUser.value.avatar_url;
                resultsElem.appendChild(img);
                return img;
            });
        await new Promise((resolve, reject) => setTimeout(resolve, 10000));
        images.forEach(img => img.remove())
    } catch (err) {
        console.log(`Error fetching GitHub users:`, err)
    } finally {
        console.log("Demo finished.");
    }
}

init();
