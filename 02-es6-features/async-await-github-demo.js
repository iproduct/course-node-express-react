async function showGithubData() {
  // fetch user name
  let response1 = await fetch("/user.json");
  let user = await response1.json();
  console.log(user);

  // fetch github user data
  let response2 = await fetch(`https://api.github.com/users/${user.name}`);
  let githubData = await response2.json();
  console.log(githubData);

  // show user picture
  let img = document.createElement("img");
  img.src = githubData.avatar_url;
  document.body.append(img);

  // hide it after 5 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 5000));

  img.remove();
  console.log("Demo finished.")

  return githubData;
}

console.log(showGithubData());
