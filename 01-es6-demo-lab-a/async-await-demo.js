function init() {
  fetch(`https://api.github.com/users/iproduct`)
    .then(result => {
        console.log(result);
        return result.json();
    })
    .then(data => {
        const img = document.createElement('img');
        img.src= data.avatar_url;
        document.body.append(img);
    })
    .catch(err => console.log(err));
}
