# postcss-fontsource-url

[![NPM version][npm-version-image]][npm-link]
[![License][license-image]][license-link]

[PostCSS] plugin that transforms [`@fontsource`] `src` CSS properties values to
point URLs to your own custom directory.

## Installation

```bash
npm add --save-dev postcss-fontsource-url
```

## Usage

Move the [`@fontsource`] fonts to your public directory:

```txt
📁 dist
└── 📁 assets
    └── 📁 fonts
        ├── roboto-mono-latin-400-normal.woff
        └── roboto-mono-latin-400-normal.woff2
```

```css
/* stylesheet.css */
@import '@fontsource/roboto-mono/400.css';
```

```js
// postcss.config.mjs
import postcssImport from 'postcss-import';
import postcssFontsourceUrl from 'postcss-fontsource-url';

export default {
  plugins: [
    postcssImport,
    postcssFontsourceUrl({directory: '/assets/fonts'}),
  ],
};
```

The imported CSS will be transformed to something like this:

```css
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: url('/assets/fonts/roboto-mono-latin-400-normal.woff2') format('woff2'),
       url('/assets/fonts/roboto-mono-latin-400-normal.woff') format('woff');
}
```

From the original CSS:

```css
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: url('./files/roboto-mono-latin-400-normal.woff2') format('woff2'),
       url('./files/roboto-mono-latin-400-normal.woff') format('woff');
}
```

## Alternative

If you need a more specific solution for the problem, use [`postcss-url`]
directly:

```js
// postcss.config.mjs
import postcssUrl from 'postcss-url';

export default {
  plugins: {
    postcssUrl({
      url(asset) {
        // Rewrite @fontsource fonts URLs to use the `/assets/fonts` folder
        // instead of the default `./files/` path.
        if (asset.url.startsWith('./files/')) {
          return `/assets/fonts/${asset.url.slice('./files/'.length)}`;
        }

        return asset.url;
      },
    }),
  },
};
```

[PostCSS]: https://postcss.org
[`@fontsource`]: https://fontsource.org
[`postcss-url`]: https://www.npmjs.com/package/postcss-url
[npm-link]: https://www.npmjs.com/package/postcss-fontsource-url
[npm-version-image]: https://img.shields.io/npm/v/postcss-fontsource-url
[license-image]: https://img.shields.io/npm/l/postcss-fontsource-url?color=blue
[license-link]: https://github.com/mondeja/postcss-fontsource-url/blob/master/LICENSE
