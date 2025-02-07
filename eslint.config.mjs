import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import prettierVue from "@vue/eslint-config-prettier"

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,tsx,vue}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  // JavaScript 推荐规则
  pluginJs.configs.recommended,
  // TypeScript 推荐规则
  ...tseslint.configs.recommended,
  // Vue 推荐规则
  ...pluginVue.configs["flat/recommended"],
  // Prettier 配置
  prettierVue,
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  {
    rules: {
      //* 自定义规则
      "prettier/prettier": [
        "error",
        {
          singleQuote: false, // 使用双引号
          semi: false, // 末尾添加分号
          tabWidth: 2,
          trailingComma: "none",
          useTabs: false,
          endOfLine: "auto"
        }
      ]
    }
  },
  {
    ignores: [
      "node_modules",
      "**/dist",
      "**/*.css",
      "**/*.png",
      "**/*.jpeg",
      "**/*.jpg",
      "**/*.gif",
      "**/*.d.ts"
    ]
  }
]
