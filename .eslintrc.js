module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/airbnb", "@vue/typescript/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
    "no-unused-expressions": "off",
    "no-restricted-syntax": "off",
    "no-multiple-empty-lines": "off",
    "max-len": "off"
  }
};
