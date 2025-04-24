const {equal} = require('node:assert');
const {test} = require('node:test');
const postcss = require('postcss');
// eslint-disable-next-line import-x/extensions
const plugin = require('.');

async function run(input, output, options = {}) {
  const result = await postcss([plugin(options)]).process(input, {
    from: undefined,
  });
  equal(result.css, output);
  equal(result.warnings().length, 0);
}

test('throws if no directory option is provided', async () => {
  try {
    await run(
      '@font-face { font-family: "Roboto Mono"; }',
      '@font-face { font-family: "Roboto Mono"; }',
      {},
    );
  } catch (error) {
    equal(error.message, 'The `directory` option is required');
  }
});

test('rewrites url()s', async () => {
  const input = `@font-face {
    font-family: 'Roboto Mono';
    src: url(./files/roboto-mono-cyrillic-ext-400-normal.woff2) format('woff2'), url(./files/roboto-mono-cyrillic-ext-400-normal.woff) format('woff');
  }`;
  const output = input.replaceAll('./files/', '/assets/fonts/');
  await run(input, output, {directory: '/assets/fonts/'});
});
