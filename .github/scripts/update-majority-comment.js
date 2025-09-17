/* Post or update a sticky PR comment with approval status */
module.exports = async function ({ github, context, core }) {
  const {
    MARK,
    HAVE,
    NEEDED,
    TEAM_SIZE,
    APPROVERS_JSON,
    REMAINING_JSON,
    TEAM_SLUG
  } = process.env;

  let approvers = [];
  let remaining = [];

  try {
    if (APPROVERS_JSON) approvers = JSON.parse(APPROVERS_JSON);
    if (!Array.isArray(approvers)) { approvers = []; core.warning('Approvers not an array after parse.'); }
  } catch (e) {
    core.warning(`Could not parse APPROVERS_JSON='${APPROVERS_JSON}': ${e.message}`);
  }
  try {
    if (REMAINING_JSON) remaining = JSON.parse(REMAINING_JSON);
    if (!Array.isArray(remaining)) { remaining = []; core.warning('Remaining not an array after parse.'); }
  } catch (e) {
    core.warning(`Could not parse REMAINING_JSON='${REMAINING_JSON}': ${e.message}`);
  }

  const have = Number(HAVE);
  const needed = Number(NEEDED);
  const teamSize = Number(TEAM_SIZE);

  const fmtList = arr => (arr.length ? arr.map(u => `@${u}`).join(', ') : '_none_');
  const statusLine = have >= needed
    ? `✅ **Majority reached:** ${have}/${needed} approvals from \`${TEAM_SLUG}\`.`
    : `⏳ **Approvals:** ${have}/${needed} from \`${TEAM_SLUG}\`. Need **${needed - have}** more.`;

  const body = `${MARK}
${statusLine}

**Approved by:** ${fmtList(approvers)}
**Still needed from:** ${fmtList(remaining)}

<sub>Team size considered: ${teamSize}. This comment auto-updates as reviews change.</sub>`;

  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const prNum = context.issue.number;

  const comments = await github.paginate(
    github.rest.issues.listComments,
    { owner, repo, issue_number: prNum, per_page: 100 }
  );
  const existing = comments.find(c => c.body && c.body.includes(MARK));

  if (existing) {
    await github.rest.issues.updateComment({
      owner, repo, comment_id: existing.id, body
    });
    core.info('Updated existing majority status comment.');
  } else {
    await github.rest.issues.createComment({
      owner, repo, issue_number: prNum, body
    });
    core.info('Created new majority status comment.');
  }
};