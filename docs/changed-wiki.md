# workflow

1. Make changes：做出变更；
2. Commit those changes：提交变更；
3. Bump version in package.json：修改 package.json 中的版本号；
4. conventionalChangelog：运行命令生成 CHANGELOG.md；
5. Commit package.json and CHANGELOG.md files：提交版本号与变更日志的变更；
6. Tag：提交打版本标签；
7. Push：推送提交；

## Links

- [约定式提交 规范](https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/)
- [link](https://juejin.cn/post/7301637665765605414)

- [some](https://baiwumm.com/p/hb2w09qj)


# release-it


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
      // 在 release-it 生命周期 一开始就运行，[git pull ,pretty]
      "before:init": "npm test",
      // 版本提升时运行  test build
      "after:bump": "gulp version --bump ${version} && npm run build && npm run test:build:version && git add ./dist && git add ./package-lock.json",
      //git release 前运行 , lint test build
      "before:release": "npm run release:changelog:fix",
      // changle
      "after:release": "echo Successfully released ${name} v${version} to ${repo.repository}."
    }
  }
```

# commitlint

> 一款校验提交信息的工具

> 添加钩子脚本 npx husky add .husky/commit-msg, 并编辑运行脚本为

- 提交类型（type）: 必填, 描述修改的类型，例如：feat，fix
- 影响范围（scope）：必填，描述修改的影响范围
- 标题行（subject）: 必填, 描述主要修改类型和内容。
- 主题内容（body）: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等。
- 页脚注释（footer）: 可以写注释，放 BUG 号的链接。


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

## Release-it

> init configuration use pnpm create release-it

```ts
{
  "git": {
    // 配置只有 chore commit 才创建 release package
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
  // hooks <before|after>:<plugin>:<init|bump|release>
  "hooks": {
    "before:init": [
        "git pull","npm run lint","npm run test"
    ],
    // 生成版本号 & build 
    "after:bump": "npm run release:changelog:fix",
    // 生成 changelog
    "before:release":"",
    // 提交release message
    "after:release": "echo Successfully released ${name} v${version} to ${repo.repository}.",
  }
}


{
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
    "before:init": ["git pull"],
    "after:init":["npm run lint","npm run test"],
    "after:bump": ""
  }
}

```

git标签版本bump是指通过修改项目中的package.json文件和git标签来实现版本管理和更新

------

# git-hooks

| git hook | 执行时机 | 用法 | 说明 | 
|--------|--------|--------|-------|
| pre-commit | git commit |  执行前来检查代码风格是否一致可以使用|  git commit --no verify 命令绕过该钩子 |
| commit-msggit | commit 执行前 | 用来在提交通过前验证项目状态或提交信息  | 可以使用 git commit --no verify 命令绕过该钩子  |


# Husky

> 一个可以高效管理 Git hooks 的工具

# lint-staged

> 对提交的代码进行检查的工具


```json
{
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json}": [
      "prettier --write",
      "eslint"
    ]
  }
}
```


# Github Actions

开始一个新项目，一般情况是首先 clone project ,configuration 你的代码环境，然后 npm install 、build 等等。
GitHub Actions 做的事情是相似的。它设置一个带有操作系统的容器。然后，它下载软件和我们代码的当前版本。最后，它执行一系列任务...

1. create .github/workflows
2. touch release.yml

```yaml
##.github/workflows/release.yml
name: Release & Publish to NPM
on: workflow_dispatch
jobs:
    release:
    runs-on: ubuntu-20.04
    steps:
    - name: Checkout source code
        uses: actions/checkout@v2
    - name: Install the dependancies
        run: npm ci
    - name: Initialise the NPM config
        run: npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
        env:
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
    - name: Initialize Git user
        run: |
        git config --global user.email "david@kodaps.com"
        git config --global user.name "Release Workflow"
    - name: Log git status
        run: git status
    - name: Run release
        run: npm run release --ci
        env:
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```
