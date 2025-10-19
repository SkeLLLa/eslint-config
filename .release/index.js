import changelog from './changelog.js';
import commitAnalyzer from './commit-analyzer.js';
import git from './git.js';
import github from './github.js';
import npmPublish from './npm-publish.js';
import releaseNotes from './release-notes.js';

export default {
  branches: [
    { name: 'master', prerelease: false },
    { name: 'next', prerelease: true },
  ],
  plugins: [commitAnalyzer, releaseNotes, changelog, npmPublish, git, github],
};
