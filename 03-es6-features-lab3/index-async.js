'use strict'

async function showUsers() {
    try {
        const resp = await fetch('users.json');
        const users = await resp.json();
        console.log(users);
        const results = await Promise.all(
            users.map(user => 
                fetch(`http://api.github.com/users/${user.name}`)
                    .then(resp => resp.json())
            )
        );
        console.log(results);
        const images = results.map(result => result.avatar_url)
                .map(imageUrl => {
                const image = new Image();
                image.src = imageUrl;
                document.body.append(image);
                return image; 
            });
        images.forEach((image,index) => setTimeout(img => img.remove(), (index+1)*1000, image, index ));
        return results;
    } catch(err) {
        console.log(`Error catched: ${err}`);
        return Promise.reject('Network error'); //throw('Network error');
    }
}

showUsers().then(results => {
    console.log(`Demo finshed: ${results}`);
});