
(async () => {
    try {
        const response = await fetch('users.json');
        if (response.status >= 404) {
            throw await response.text()
        }
        const users = await response.json();
        console.log(users);
        gitUserPromises = users.map(async user => {
            const userResp = await fetch(`https://api.github.com/users/${user.username}`);
            return userResp.json();
        });
        const gitUserResults = await Promise.allSettled(gitUserPromises)
        const gitUsers = gitUserResults.filter(gitUser => gitUser.status === 'fulfilled')
            .map(gitUser => gitUser.value)
        console.log(gitUsers)
        if (gitUsers.length === 0) {
            throw 'No users fetched'
        }
        const images = gitUsers.map(gitUser => {
            const img = new Image();
            img.src = gitUser.avatar_url;
            document.getElementById('results').appendChild(img);
            return img;
        });
        await new Promise(resolve => setTimeout(resolve, 5000));
        images.forEach(img => img.remove());
    } catch (err) {
        console.log(`Error:`, err);
        document.getElementById('results').innerHTML = `<h2>Error: ${err}</h2>`
    } finally{
        console.log('Demo finished.');
    } 
})(); // IIFE
