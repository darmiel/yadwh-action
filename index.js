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

    (async () => {
        const response = await fetch(target, {
            method: 'GET',
            headers: {
                'X-YADWH-Secret': secret
            }
        });

        // get response body
        const body = await response.text();
        console.log("response:", body);
    })();
} catch (error) {
    core.setFailed(error.message);
}