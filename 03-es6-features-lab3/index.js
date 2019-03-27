'use strict'

function showUsers() {
    fetch('users.json')
    .then(resp => resp.json())
    .then(users => {
        console.log(users);
        return Promise.all(
            users.map(user => 
                fetch(`http://api.github.com/users/${user.name}`)
                    .then(resp => resp.json())
            )
        );
    }).catch(err => {
        console.log(`Error catched: ${err}`);
        return Promise.reject('Network error'); //throw('Network error');
    }).then(results => {
        console.log(results);
        const images = results.map(result => result.avatar_url)
            .map(imageUrl => {
                const image = new Image();
                image.src = imageUrl;
                document.body.append(image);
                return image; 
            });
        images.forEach((image,index) => setTimeout(img => img.remove(), (index+1)*1000, image, index ));
    }).catch(err => console.log(`Final catch: ${err}`));
}

showUsers();