function init() {
    const userResponse = fetch('user.json');
    const userPromise = userResponse.then(resp => resp.json());
    const gitResponse = userPromise.then(user => fetch(`http://api.github.com/users/${user.name}`));
    const gitPromise = gitResponse.then(resp => resp.json());
    gitPromise.then(result => {
        console.log(result);
        const img = new Image();
        img.src = result.avatar_url;
        document.body.append(img);
        return new Promise((resolve, reject) => setTimeout(() => {
            img.remove();
            resolve();
        }, 6000));
    }).then(result => console.log(`Demo finished.`));
}