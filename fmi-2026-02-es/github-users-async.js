const resultsDiv = document.getElementById('results');
(async () => {
    try {
        const usersResp = await fetch('users.json');
        const users = await usersResp.json();
        console.log(users);
        const usersData = await Promise.allSettled(users.map(async user => {
            const gitUserResp = await fetch(`https://api.github.com/users/${user.username}`);
            return gitUserResp.json()
        }));
        const gitUserImages = usersData.filter(userData => userData.status === 'fulfilled')
            .map(userData => userData.value)
            .map(gitUser => {
                const img = new Image();
                img.src = gitUser.avatar_url;
                resultsDiv.append(img)
                return img;
            });
        await new Promise(resolve => setTimeout(resolve, 10000))
        gitUserImages.forEach(img => img.remove())
    } catch(err){
        console.log(err);
    }
})() // IIFE
