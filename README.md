# [webpack]-to-memory

A quick 'n dirty module to compile one or more bundles using webpack and load
those compiled bundles as node modules -- all in memory!

## Usage

This module exports a single function which takes a [webpack] compiler
configured according to the [webpack Node Node API][wpapi] (note: you can ignore
the section on compiling to memory, this module takes care of that for you). The
most important things to configure are the `target` (`'node'`) and the
`libraryTarget` (`'commonjs2'`). The exported function returns a `Promise` which
resolves with an object mapping output filenames to compiled node modules.

```js
const webpack = require('webpack');
const load = require('webpack-to-memory');

load(webpack({
  entry: 'index.js',
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'bar.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
    }],
  },
})).then(files => {
  // Now you can get the node modules.
  const bar = files['bar.js']; // `bar` now contains the `exports` object from `bar.js`
});
```

## Caveats

All output is placed in an [in-memory filesystem][mfs]. Node doesn't read from
this filesystem directly, so if you create multiple bundles that depend on each
other your modules will fail to load (except in a few edge cases). If you have a
setup such as this it is probably better to just compile out to the real
filesystem ahead of time and `require` or `import` the modules as normal.

## License

MIT

[mfs]: https://www.npmjs.com/package/memory-fs "mfs"
[webpack]: http://webpack.github.io/ "webpack"
[wpapi]: http://webpack.github.io/docs/node.js-api.html "webpack Node API"
