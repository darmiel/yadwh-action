const core = require('@actions/core');
const axios = require('axios').default;

async function run() {
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
        axios.get(target, {
            headers: {
                'X-YADWH-Secret': secret
            }
        }).then(function (response) {
            console.log("response received");
            console.log(response.data);
            core.setOutput(response.data);
        }).catch(function (error) {
            console.log("error received");
            console.log(error);
            core.setFailed(error);
        });
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run()
