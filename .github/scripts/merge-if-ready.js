/* Merge the PR if checks are successful and majority has been reached */
module.exports = async function ({ github, context, core }) {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const prNum = context.issue.number;

  const pr = (await github.rest.pulls.get({ owner, repo, pull_number: prNum })).data;
  const status = await github.rest.repos.getCombinedStatusForRef({
    owner, repo, ref: pr.head.sha
  });

  if (status.data.state !== 'success') {
    core.info(`Checks not successful yet (combined status = ${status.data.state}).`);
    return;
  }

  await github.rest.pulls.merge({
    owner,
    repo,
    pull_number: prNum,
    merge_method: process.env.MERGE_METHOD
  });
  core.info('Merged by team majority ✔️');
};