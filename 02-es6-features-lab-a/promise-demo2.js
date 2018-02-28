function init() {
    const userResult = fetch("user.json")
      .then(resp => resp.json())
      .then(user => fetch(`http://api.github.com/users/${user.name}`))
      .then(resp => resp.json())
      .then(githubUser => {
          const img = document.createElement('img');
          img.src = githubUser.avatar_url;
          document.body.appendChild(img);
          return new Promise((resolve, reject) => {
              setTimeout(() => { img.src = ''; resolve()} , 6000)
          })
      }).then(() =>  {
          console.log('Demo finished.');
      }).catch(err => {console.log(err)});
  }
  