import { danger, fail, markdown, warn } from 'danger';

// Setup
const { github } = danger;
const { pr } = github;
// const commits = github.commits;
const modified = danger.git.modified_files;
// console.log(commits.map(({ sha }) => sha));
const noTicketNumber = pr.title.match(/^(\[NO_TICKET])\s\w+/);
const dependabotRequest = pr.title.match(/(.*)(bump)/);

let errorCount = 0;
const bigPRThreshold = 500;

// Custom subsets of known files
// const modifiedAppFiles = modified.filter((filePath) => filePath.includes('src/') || filePath.includes('test/'));
// Check test exclusion (.only) is included
// const modifiedSpecFiles = modified.filter((filePath) => filePath.match(/-spec.(js|jsx|ts|tsx)$/gi));

if (!noTicketNumber && !dependabotRequest) {
  if (!pr.title.match(/^(?:(\[PPM-\d+])|(\[PCP-\d+]))\s\w+/)) {
    fail('PR title should include JIRA ticket number [PPM/PCP-{number}] {description}.');
  }

  if (!pr.body.match(/(.*)(?:(\[PPM-\d+])|(\[PCP-\d+]))/) && !noTicketNumber) {
    fail('PR body should include JIRA ticket number [PPM/PCP-{number}]');
  }

  if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
    warn(`:exclamation: Big PR (${(errorCount += 1)})`);
    markdown(
      `> (${errorCount}) : Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.`
    );
  }

  const packageChanged = modified.includes('package.json');
  const lockfileChanged = modified.includes('yarn.lock');

  if (packageChanged && !lockfileChanged) {
    warn(`:exclamation: yarn.lock not updated (${(errorCount += 1)})`);

    const message = 'Changes were made to package.json, but not to yarn.lock';
    const idea = 'Perhaps you need to run `yarn install`?';

    warn(`${message} - <i>${idea}</i>`);
    markdown(`> (${errorCount}) : ${message} - <i>${idea}</i>`);
  }

  // const hasAppChanges = modifiedAppFiles.length > 0;
  // const hasTestChanges = modifiedSpecFiles.length > 0;

  // if (hasAppChanges && !hasTestChanges) {
  //   warn(`:exclamation: Missing Tests (${(errorCount += 1)})`);
  //   markdown(
  //     `> (${errorCount}) : there are app changes, but not tests. That's OK as long as you're refactoring existing code`
  //   );
  // }
}
