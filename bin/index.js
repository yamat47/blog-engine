#! /usr/bin/env node

const shell = require('shelljs')

const init = () => {
  shell.mkdir('.app')

  shell.cp('-rf', 'node_modules/@yamat47/sample-blog-engine/bin/init/template/root/.', '.')
  shell.cp('-rf', 'node_modules/@yamat47/sample-blog-engine/bin/init/template/app/.', '.app')

  shell.touch('.gitignore')
  shell.echo('.app').toEnd('.gitignore')
};

const preview = () => {
  shell.echo('Current working directory is:')
  shell.echo(shell.pwd())

  shell.rm('-rf', '.app/posts')
  shell.rm('-rf', '.app/public/images')
  shell.rm('-f', '.app/config/application.ts')

  shell.cp('-rf', 'posts', '.app')
  shell.cp('-rf', 'images', '.app/public')
  shell.cp('-f', 'config.ts', '.app/config/application.ts')

  shell.cd('.app')

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
