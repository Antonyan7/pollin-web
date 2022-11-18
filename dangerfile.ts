import { danger, fail, markdown, warn } from 'danger';

// Setup
const { github } = danger;
const { pr } = github;
// const commits = github.commits;
const modified = danger.git.modified_files;
// console.log(commits.map(({ sha }) => sha));
const noTicketNumber = pr.title.match(/^(NO_TICKET:)\s\w+/);
const dependabotRequest = pr.title.match(/(.*)(bump)/);

const ticketIDPattern = /(PPM-\d+|PCP-\d+)/; // valid: "PPM-123", "PCP-123"
const prTitlePattern = /(((PPM-\d+|PCP-\d+)(\(\d+\))?),?)+:\s\w+/; // valid: "PPM-108: Setup Danger" or "PPM-108(2),PCM-109: Setup Danger & Run it on CI"
const jiraLink = 'https://fhhealth.atlassian.net/browse/';

let errorCount = 0;
const bigPRThreshold = 500;

// Custom subsets of known files
// const modifiedAppFiles = modified.filter((filePath) => filePath.includes('src/') || filePath.includes('test/'));
// Check test exclusion (.only) is included
// const modifiedSpecFiles = modified.filter(function (filePath) {
//   return filePath.match(/-spec.(js|jsx|ts|tsx)$/gi);
// });
// const modifiedEntities = modified.filter((filePath) => filePath.match(/.entity.ts$/gi));
if (!noTicketNumber && !dependabotRequest) {
  if (!prTitlePattern.test(pr.title)) {
    fail(
      'PR title is incorrect.Follow pattern: `PPM-{number}[({number})][,PCP-{number}[({number})]]: {short description}`, where`[({number})]` is optional repeated PR for the same ticket, `[,PPM-{number}[({number})]]` is optional additional resolved ticket in current PR.Examples: `PPM-108: Setup Danger`, `PCP-108(2): Setup Danger`, `PPM-108,PCP-109: Setup Danger & Run it on CI`.'
    );
  }

  const ticketIDsRegex = new RegExp(ticketIDPattern, 'gi');
  const ticketIDs = pr.title.match(ticketIDsRegex);

  if (ticketIDs && !noTicketNumber) {
    ticketIDs.forEach((ticketID) => {
      const jiraTicketLink = jiraLink + ticketID;

      if (!pr.body.includes(jiraTicketLink)) {
        fail(`PR body is missing link to JIRA ticket - [${ticketID}](${jiraTicketLink})`);
      }
    });
  }

  if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
    errorCount += 1;
    warn(`:exclamation: Big PR (${errorCount})`);
    markdown(
      `> (${errorCount}) : Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.`
    );
  }

  const packageChanged = modified.includes('package.json');
  const lockfileChanged = modified.includes('yarn.lock');

  if (packageChanged && !lockfileChanged) {
    errorCount += 1;
    warn(`:exclamation: yarn.lock not updated (${errorCount})`);

    const message = 'Changes were made to package.json, but not to yarn.lock';
    const idea = 'Perhaps you need to run `yarn install`?';

    warn(`${message} - <i>${idea}</i>`);
    markdown(`> (${errorCount}) : ${message} - <i>${idea}</i>`);
  }

  // const hasAppChanges = modifiedAppFiles.length > 0;
  // const hasTestChanges = modifiedSpecFiles.length > 0;
  // if (hasAppChanges && !hasTestChanges) {
  //   warn(':exclamation: Missing Tests (' + ++errorCount + ')');
  //   markdown(
  //     '> (' +
  //       errorCount +
  //       ") : there are app changes, but not tests. That's OK as long as you're refactoring existing code"
  //   );
  // }

  // if (modifiedEntities.length > 0) {
  //   warn(':exclamation: Changes are made in entities (' + ++errorCount + ')');
  //   markdown('> (' + errorCount + ') : there are entity changes. Please do corresponding Django updates');
  // }
}
