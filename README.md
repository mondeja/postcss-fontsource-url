# postcss-fontsource-url

[PostCSS] plugin that transforms [`@fontsource`] `src` CSS properties values
to point URLs to your own custom directory.

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
import postcssFontsourceUrl from 'postcss-fontsource-url';

export default {
  plugins: {
    postcssFontsourceUrl({directory: '/assets/fonts'}),
  },
};
```

## Alternative

If you want a more complex solution for the problem, you can use `postcss-url`:

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
