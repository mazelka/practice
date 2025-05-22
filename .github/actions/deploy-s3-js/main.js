const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');
function run() {
    core.info('Starting deploy-s3 action');
    const bucket = core.getInput('bucket', { required: true });
    const region = core.getInput('region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    exec.exec('aws', ['s3', 'sync', distFolder, `s3://${bucket}`, '--region', region])
        .then(() => {
            core.info('Deployment to S3 completed successfully');
        })
        .catch((error) => {
            core.setFailed(`Deployment to S3 failed: ${error.message}`);
        });
    const websiteURL = `http://${bucket}.s3-website-${region}.amazonaws.com`;
    core.info(`Website URL: ${websiteURL}`);
    core.setOutput('websiteURL', websiteURL);
}
run();