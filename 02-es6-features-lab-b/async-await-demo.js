async function init() {
  try {
    const userResponse = await fetch("user.json");
    const user = await userResponse.json();
    const gitResponse = await fetch(`http://api.github.com/users/${user.name}`);
    const gitResult = await gitResponse.json();
    console.log(gitResult);
    const img = new Image();
    img.src = gitResult.avatar_url;
    document.body.append(img);
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        img.remove();
        resolve();
      }, 6000)
    );
    console.log(`Demo finished.`);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}
