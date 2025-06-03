module.exports = {
  '*.{js,ts,vue}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.{css,scss}': ['prettier --write'],
  '*.{json,md,yaml,yml}': ['prettier --write'],
  '*.{png,jpg,jpeg,gif,svg,webp}': ['imagemin-lint-staged'],
}
