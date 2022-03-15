async function demo() {
    try {
        const resultsElem = document.getElementById("results")
        const usersResp = await fetch('users.json')
        const users = await usersResp.json()
        console.log(users);
        const gitUsers = await Promise.all(users.map(async user => {
            const gitUserResp = await fetch(`https://api.github.com/users/${user.username}`);
            return await gitUserResp.json();
        }));
        console.log(gitUsers);
        const images = gitUsers.map(u => {
            const img = new Image();
            img.src = u.avatar_url;
            resultsElem.appendChild(img);
            return img;
        });
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 10000)
        });
        images.forEach(img => resultsElem.removeChild(img));
    } catch(err) {
        console.log(`Error: ${err}`)
    } finally {
        console.log("Demo finished.")
    }
}

demo()