/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (options = {}) => {
  if (typeof options.directory !== 'string') {
    throw new TypeError('The `directory` option is required');
  }

  if (options.directory.at(-1) !== '/') {
    options.directory += '/';
  }

  return {
    postcssPlugin: 'postcss-fontsource-url',

    Declaration: {
      src(decl) {
        if (
          decl.parent.type === 'atrule' &&
          decl.parent.name === 'font-face' &&
          decl.value.startsWith('url(./files/')
        ) {
          decl.value = decl.value.replaceAll(
            'url(./files/',
            `url(${options.directory}`,
          );
        }
      },
    },
  };
};

module.exports.postcss = true;
