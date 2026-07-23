const config = {
  '**/*.{js,jsx,mjs,ts,tsx,mts,mdx}': ['eslint --fix', 'prettier --write'],
  '**/*.{json,md,css,html,yml,yaml,scss}': ['prettier --write'],
};

export default config;
