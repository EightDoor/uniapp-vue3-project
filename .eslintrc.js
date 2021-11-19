module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    // 禁止使用未经声明的变量
    'no-undef': 'off',
    // 解析导入的模块
    'import/no-unresolved': 'off',
    // 导入/扩展 - 确保在导入路径中一致使用文件扩展名
    'import/extensions': 'off',
    // 不允许给自定义vue v-model添加参数
    'vue/no-v-model-argument': 'off',
  },
};
