import webpack from 'webpack';
import load from '../src';
import { join } from 'path';

const config = {
  entry: join(__dirname, './fixtures/foo.js'),
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'bar.js',
    path: join(__dirname, './output'),
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
    }],
  },
};

describe('lib tests', () => {
  it('compile to memory', () => load(webpack(config))
  .then(files => expect(files).to.deep.equal({
    'bar.js': 'foo',
  })));

  it('compile source to memory', () => load(webpack(config))
  .then(files => expect(files['bar.js']).to.be.a('string')));
});
