async function demo() {
    try {
        const resultsElem = document.getElementById("results");
        const usersResp = await fetch('users.json');
        const users = await usersResp.json();
        console.log(users);
        const gitUsers = await Promise.all(users.map(async user => {
            const usersResp = await fetch(`htt://api.github.com/users/${user.username}`);
            return await usersResp.json();
        }));
        console.log(gitUsers);
        const images = gitUsers.map(gitUser => {
            const img = new Image();
            img.src = gitUser.avatar_url
            resultsElem.appendChild(img);
            return img;
        })
        await new Promise((resolve) => {
            setTimeout(resolve, 5000)
        });

        //remove images after 5 seconds
        images.forEach(img => resultsElem.removeChild(img));
        return users;
    } catch (err) {
        console.log("Error: " + err);
        return `Error: ${err}.`;
    } finally{
         console.log("Demo finished.");
    }
}

demo().then(data => {
    console.log("END Git Users: ", data);
});