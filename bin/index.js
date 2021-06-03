#! /usr/bin/env node

const shell = require('shelljs')

const init = () => {
  shell.cp('-rf', 'bin/init/template/*', '.')
};

const preview = () => {
  shell.rm('-rf', 'src/posts')
  shell.rm('-rf', 'src/public/images')
  shell.rm('-f', 'src/config/application.ts')

  shell.cp('-rf', 'posts', 'src')
  shell.cp('-rf', 'images', 'src/public')
  shell.cp('-f', 'config.ts', 'src/config/application.ts')

  shell.cd('src')

  shell.echo('Install dependencies...')
  shell.exec('npm install')

  shell.echo('Start server...')
  shell.exec('npx next dev')
};

const [,, ...args] = process.argv
const command = args[0]

switch (command) {
  case 'init':
    init();
    break;
  case 'preview':
    preview();
    break;
  default:
    console.log('unknown command. please use `init` or `preview`')
}
