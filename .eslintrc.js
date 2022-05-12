module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // 禁止使用未经声明的变量
    'no-undef': 'off',
    // 解析导入的模块
    'import/no-unresolved': 'off',
    // 导入/扩展 - 确保在导入路径中一致使用文件扩展名
    'import/extensions': 'off',
    // 不允许给自定义vue v-model添加参数
    'vue/no-v-model-argument': 'off',
    // 禁止重新分配函数参数
    'no-param-reassign': 'off',
    // 禁止出现未使用的变量
    'no-unused-vars': 'off',
    // 在未定义变量之前定义
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
  },
};
