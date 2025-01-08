module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended", // Включает prettier как плагин ESLint
  ],
  parser: "@babel/eslint-parser", // Поддержка современного JavaScript
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false, // Для использования без babel.config.js
  },
  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
    "simple-import-sort",
    "unused-imports",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect", // Автоматическое определение версии React
    },
  },
  rules: {
    "prettier/prettier": "error", // Ловит ошибки форматирования Prettier
    "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }], // Для файлов .jsx и .tsx
    "react/react-in-jsx-scope": "off", // React не нужен в scope для Next.js
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/order": "off", // Выключено в пользу simple-import-sort
    "simple-import-sort/imports": "error", // Сортировка импортов
    "simple-import-sort/exports": "error",
    "unused-imports/no-unused-imports": "error", // Удаление неиспользуемых импортов
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
          },
        ],
      },
    },
  ],
};
