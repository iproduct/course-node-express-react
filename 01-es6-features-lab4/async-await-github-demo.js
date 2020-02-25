async function showGithubData() {
  try {
    // fetch user name
    let response1 = await fetch("/users.json");
    let user = await response1.json();
    console.log(user);

    // fetch github user data
    let response2 = await fetch(`https://api.github.com/users/${user[0].username}`);
    let githubData = await response2.json();
    console.log(githubData);

    // show user picture
    let img = new Image();
    img.src = githubData.avatar_url;
    document.body.append(img);

    // // hide it after 5 seconds
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 6000);
    });

    img.remove();
    return githubData;

  } catch(err) {
    console.log('ERROR: '  + err)
  } finally {
    console.log("Demo finished finally.");
  }
}

showGithubData().then(result => console.log(result));
