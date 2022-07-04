const spawn = require('child_process').spawn;

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

          child.stdout.on('data', function (data) {
            process.stdout.write(`LOG: ${data}`);
          });

          child.stderr.on('data', function (data) {
            process.stdout.write(`LOG: ${data}`);
          });
        });
      },
    },
  ],
};
