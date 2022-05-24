const core = require('@actions/core');

try {
    // get url, name and secret from core
    let url = core.getInput('url');
    // check if protocol is set in url
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }
    // check if url ends with / and remove it
    if (url.endsWith('/')) {
        url = url.substring(0, url.length - 1);
    }

    const name = core.getInput('name');
    const secret = core.getInput('secret');

    // make get request to target
    const target = `${url}/${encodeURI(name)}`;
    console.log("requesting", target, "...");

    // send request to target using XHR
    const xhr = new XMLHttpRequest();
    xhr.open('GET', target, true);
    xhr.setRequestHeader('X-YADWH-Secret', secret);
    xhr.onload = function () {
        core.setOutput('response', xhr.responseText);
        if (xhr.status !== 200) {
            console.log("error:", xhr.statusText);
            core.setFailed(xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.log("error:", xhr.statusText);
        core.setFailed(xhr.statusText);
    };
    xhr.send();
}
catch (error) {
    core.setFailed(error.message);
}
