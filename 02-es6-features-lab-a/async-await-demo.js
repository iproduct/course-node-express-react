async function init() {
  try {
    const userResult = await fetch("user.json");
    const user = await userResult.json();
    console.log(user);
    const githubResp = await fetch(`http://api.github.com/users/${user.name}`);
    const githubUser = await githubResp.json();
    const img = document.createElement("img");
    img.src = githubUser.avatar_url;
    document.body.appendChild(img);
    await new Promise((resolve, reject) => setTimeout(resolve, 6000));
    img.remove();
    console.log("Demo finished.");
  } catch (err) {
    console.log(err);
  }
}
