import { fetchGitAsync } from "./fetch-git-async.js";

const resultsDiv = document.getElementById("results");
fetchGitAsync(resultsDiv)