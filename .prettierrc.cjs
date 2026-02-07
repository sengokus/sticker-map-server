module.exports = {
  "printWidth": 120,
  "tabWidth": 4,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "useTabs": false,
  "arrowParens": "always",
  "bracketSpacing": true,
  "plugins": [require.resolve("@trivago/prettier-plugin-sort-imports")],
  "importOrder": ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true,
  "importOrderGroupNamespaceSpecifiers": true,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
