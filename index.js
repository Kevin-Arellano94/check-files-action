const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function checkFileExists(filePath) {
    return fs.promise.access(filePath)
    .then(() => {
        core.info(`File ${filePath} exists.`);
        return true;
    })
    .catch(() => {
        core.setFailed(`File ${filePath} is manditory.`);
        return false;
    });
}

(
    async function () {
        try {
            core.notice("Calling our action.");
            checkFileExists("LICENSE");
            checkFileExists("READEME.md");
        } catch (error) {
            core.setFailed(error.message);
        }
    }
)();