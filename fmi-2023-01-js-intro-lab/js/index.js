
function init() {
    fetch.get('')
    document.getElementById('results').innerHTML = '<h2>Hi Trayan!</h2>';
}

window.addEventListener('load', init)