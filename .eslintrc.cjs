module.exports = {
  ignorePatterns: [
    "node_modules/**",
    "dist/**",
    "build/**",
    "coverage/**",
    ".eslintrc.*"
  ],
  overrides: [
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: 2022,
        ecmaFeatures: { jsx: true }
      },
      plugins: [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "jsx-a11y",
        "import",
        "prettier"
      ],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:prettier/recommended"
      ],
      settings: {
        react: { version: "detect" },
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true,
            project: "./tsconfig.json"
          }
        }
      },
      rules: {
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "jsx-a11y/anchor-is-valid": "warn",
        "import/order": [
          "warn",
          {
            groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
            alphabetize: { order: "asc", caseInsensitive: true },
            "newlines-between": "always"
          }
        ],
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "prefer-const": "error"
      }
    }
  ]
};