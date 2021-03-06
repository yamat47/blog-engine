#! /usr/bin/env node

const shell = require('shelljs')
const ShellString = shell.ShellString

const init = () => {
  shell.mkdir('.app')

  shell.cp('-rf', 'node_modules/@yamat47/sample-blog-engine/bin/init/template/root/.', '.')
  shell.cp('-rf', 'node_modules/@yamat47/sample-blog-engine/bin/init/template/app/.', '.app')

  const gitIgnore = new ShellString('.app')
  shell.touch('.gitignore')
  gitIgnore.toEnd('.gitignore')
};

const preview = () => {
  shell.echo('Set your posts...')
  shell.rm('-rf', '.app/posts')
  shell.rm('-rf', '.app/public/images')
  shell.rm('-f', '.app/config/application.yml')

  shell.cp('-rf', 'posts', '.app')
  shell.cp('-rf', 'images', '.app/public')
  shell.cp('-f', 'config.yml', '.app/config/application.yml')

  shell.cd('.app')

  shell.echo('Install dependencies...')
  shell.exec('npm install')

  shell.echo('Start server...')
  shell.exec('npx next dev')
};

const build = () => {
  shell.echo('Set your posts...')
  shell.rm('-rf', '.app/posts')
  shell.rm('-rf', '.app/public/images')
  shell.rm('-f', '.app/config/application.yml')

  shell.cp('-rf', 'posts', '.app')
  shell.cp('-rf', 'images', '.app/public')
  shell.cp('-f', 'config.yml', '.app/config/application.yml')

  shell.cd('.app')

  shell.exec('npx next build')
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
  case 'build':
    build();
    break;
  default:
    console.log('unknown command. please use one of these: init/preview/build')
}
