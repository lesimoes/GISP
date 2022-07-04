const spawn = require('child_process').spawn;
const metadata = require('./metadata.json');

module.exports = {
  entry: './extension.js',
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          const child = spawn('dbus-run-session', [
            '--',
            'gnome-shell',
            '--nested',
          ]);

          child.stderr.on('data', function (data) {
            if (data.toString().indexOf(`${metadata.name}-Message`) >= 0) {
              process.stdout.write(`\x1b[36m APP: ${data} \x1b[0m`);
            }
            if (
              data.toString().indexOf(`${metadata.name}`) < 0 &&
              data.toString().indexOf(`-Message`) >= 0
            ) {
              process.stdout.write(`\x1b[37m DEBUG: ${data}`);
            }
          });
        });
      },
    },
  ],
};
