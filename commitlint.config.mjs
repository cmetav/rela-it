const commitlintConfig = {
  extends: [
    '@commitlint/config-conventional',
    // '@commitlint/config-angular'
  ],
  rules: {
    // type 允许的类型
    'type-enum': [
      2,
      'always',
      [
        'build', // 编译
        'chore', // 其他修改，比如改变构建流程或增加依赖、工具等
        'ci', // 集成
        'docs', // 文档更新
        'feat', // 新功能
        'fix', // Bug 修复
        'refactor', // 重构
        'revert', // 代码回滚
        'pref', // 性能优化
        'style', // 代码或工程，样式调整
        'test', // 测试用例
      ],
    ],
    'subject-case': [
      2,
      'always',
      [
        'sentence-case',
        'start-case',
        'pascal-case',
        'upper-case',
        'lower-case',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}

export default commitlintConfig
