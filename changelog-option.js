module.exports = {
  writeOpts: {
    transform: (commit, context) => {
      switch (commit.type) {
        case 'feat':
          commit.type = '✨ Features';
          break;
        case 'fix':
          commit.type = '🐛 Bug Fixes';
          break;
        case 'perf':
          commit.type = '⚡ Performance Improvements';
          break;
        case 'revert':
          commit.type = '⏪ Reverts';
          break;
        default:
          break;
      }

      if (commit.revert) {
        commit.type = '⏪ Reverts';
      }

      return
    }
  }
}