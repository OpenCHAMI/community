/* Compute team approval majority and set step outputs */
module.exports = async function ({ github, context, core }) {
  const owner = process.env.ORG;
  const repo = context.repo.repo;
  const prNum = context.issue.number;

  const members = await github.paginate(
    github.rest.teams.listMembersInOrg,
    { org: owner, team_slug: process.env.TEAM_SLUG, per_page: 100 }
  );

  const teamLogins = members.map(m => m.login).sort((a, b) => a.localeCompare(b));
  const team = new Set(teamLogins.map(s => s.toLowerCase()));
  const teamSize = team.size;
  const needed = Math.floor(teamSize / 2) + 1;

  const reviews = await github.paginate(
    github.rest.pulls.listReviews,
    { owner, repo, pull_number: prNum, per_page: 100 }
  );

  const latestByUser = new Map();
  for (const r of reviews) {
    if (!r.user) continue;
    latestByUser.set(r.user.login.toLowerCase(), r.state);
  }

  const approvers = [];
  for (const [login, state] of latestByUser.entries()) {
    if (state === 'APPROVED' && team.has(login)) approvers.push(login);
  }


  // Include PR author as an approver if they are a member of the team.
  const pr = (await github.rest.pulls.get({ owner, repo, pull_number: prNum })).data;
  const author = pr.user?.login?.toLowerCase();
  if (author && team.has(author) && !approvers.includes(author)) {
    approvers.push(author);
  }


  approvers.sort((a, b) => a.localeCompare(b));

  const have = approvers.length;
  const remaining = teamLogins.filter(u => !approvers.includes(u.toLowerCase()));
  const majority = have >= needed;

  core.setOutput('have', String(have));
  core.setOutput('needed', String(needed));
  core.setOutput('teamSize', String(teamSize));
  core.setOutput('approvers_json', JSON.stringify(approvers));
  core.setOutput('remaining_json', JSON.stringify(remaining));
  core.setOutput('majority', String(majority));
};