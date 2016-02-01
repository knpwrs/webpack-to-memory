/* eslint no-param-reassign: 0 */
import MemoryFileSystem from 'memory-fs';
import Module from 'module';
import { join } from 'path';

/**
 * @param {object} compiler The WebPack compiler.
 * @return {Promise} A promise resolved with an object of file names mapping to
 * compiled modules.
 */
export default compiler => new Promise((resolve, reject) => {
  // Compile to in-memory file system.
  const fs = compiler.outputFileSystem = new MemoryFileSystem();
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      reject(err);
    }
    const { compilation } = stats;
    // Get the list of files.
    const files = Object.keys(compilation.assets);
    // Read each file and compile module
    const { outputPath } = compiler;
    resolve(files.reduce((obj, file) => {
      // Construct the module object
      const m = new Module();
      m.paths = module.paths;
      // Get the code for the module.
      const path = join(outputPath, file);
      const src = fs.readFileSync(path, 'utf8');
      // Compile it into a node module!
      m._compile(src, path);
      // Add the module to the object.
      obj[file] = m.exports;
      return obj;
    }, {}));
  });
});
