# workflow

Make changes：做出变更；
Commit those changes：提交变更；
Bump version in package.json：修改 package.json 中的版本号；
conventionalChangelog：运行命令生成 CHANGELOG.md；
Commit package.json and CHANGELOG.md files：提交版本号与变更日志的变更；
Tag：提交打版本标签；
Push：推送提交；

## 
- [link](https://juejin.cn/post/7301637665765605414)

- [](https://baiwumm.com/p/hb2w09qj)


### release-it
```json
  "release-it": {
    "git": {
      "commitMessage": "chore(release): v${version}",
      "push": true,
      "commit": true,
      "tag": true,
      "requireCommits": false,
      "requireCleanWorkingDir": false
    },
    "github": {
      "release": true,
      "draft": true
    },
    "npm": {
      "publish": false,
      "ignoreVersion": false
    },
    "plugins": {
      "@release-it/conventional-changelog": {
        "preset": "angular",
        "infile": "CHANGELOG.md",
        "header": "# Changelog"
      }
    },
    "hooks": {
      "before:init": "npm test",
      "after:bump": "gulp version --bump ${version} && npm run build && npm run test:build:version && git add ./dist && git add ./package-lock.json",
      "before:release": "npm run release:changelog:fix",
      "after:release": "echo Successfully released ${name} v${version} to ${repo.repository}."
    }
  }
```

### commitlint

```json
{
  "commitlint": {
    "rules": {
      "header-max-length": [
        2,
        "always",
        130
      ]
    },
    "extends": [
      "@commitlint/config-conventional"
    ]
  }
}

```


# NPM package.json

```
$ commitlint --config commitlint.config.mjs -e -V
-V enable verbose
-e read last commit message from the specified file or fallbacks to ./.git/COMMIT_EDITMSG

## Verify commitlint

 npx commitlint --from HEAD~1 --to HEAD --verbose

```

