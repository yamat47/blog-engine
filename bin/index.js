#! /usr/bin/env node

const shell = require('shelljs')

const init = () => {
  shell.cp('-rf', 'node_modules/@yamat47/sample-blog-engine/bin/init/template/*', '.')
};

const preview = () => {
  shell.rm('-rf', 'node_modules/@yamat47/sample-blog-engine/src/posts')
  shell.rm('-rf', 'node_modules/@yamat47/sample-blog-engine/src/public/images')
  shell.rm('-f', 'node_modules/@yamat47/sample-blog-engine/src/config/application.ts')

  shell.cp('-rf', 'posts', 'node_modules/@yamat47/sample-blog-engine/src')
  shell.cp('-rf', 'images', 'node_modules/@yamat47/sample-blog-engine/src/public')
  shell.cp('-f', 'config.ts', 'node_modules/@yamat47/sample-blog-engine/src/config/application.ts')

  shell.cd('node_modules/@yamat47/sample-blog-engine/src')

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
