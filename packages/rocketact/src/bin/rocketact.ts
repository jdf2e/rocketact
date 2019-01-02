#!/usr/bin/env node

import {
  error,
  warning,
  success,
  info,
  infoBlock,
  normalBlock,
  successBlock,
  packageUtil
} from 'rocketact-dev-utils';

import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

const validatePackageName = require('validate-npm-package-name'); // tslint:disable-line

import program from 'commander';

/** 项目名称 */
let projectName: string | undefined;

const projectMainPkg = fs.readJsonSync(path.resolve(__dirname, '../../package.json'));

program
  .version(projectMainPkg.version, '-v, --version, -V')
  .arguments('<project-directory>')
  .description('rocketact will help you create <project-directory> [options]')
  .option('create', 'Create an awesome app')
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`Only ${infoBlock('<project-directory>')} is required.`);
    // TODO: 补充更多内容
  })
  .action((projectDirectory: string) => {
    projectName = projectDirectory;
  })
  .parse(process.argv);

if (!projectName) {
  console.log(error('Please specify the project directory!'));
  process.exit(0);
}

createProject();

/**
 * 校验项目名称
 */
function checkProjectName(): void {
  const validationResult = validatePackageName(projectName);
  if (!validationResult.validForNewPackages) {
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(0);
  }
}

/**
 * 打印名称校验结果
 *
 * @param {[string]} results
 */
function printValidationResults(results: [string]): void {
  if (typeof results !== 'undefined') {
    results.forEach((result) => {
      console.error(error(`  *  ${result}`));
    });
  }
}

async function createProject() {
  checkProjectName();

  const root = path.resolve(projectName as string);
  const appName = path.basename(root);

  fs.ensureDirSync(appName);

  await copyTemplateFiles(root);

  process.chdir(root);

  await replacePkgConfig();

  console.log('Installing packages. This might take a couple of minutes.');
  console.log('Installing react, react-dom, and rocketact-script...');

  try {
    await packageUtil.install();
    console.log(`Installing packages. ${successBlock(' done ')}`);
  } catch (err) {
    console.log(err);
    console.log(error('Install packages failed.'));
  }

  console.log();
  console.log(`${successBlock(' All Things done. ')}`);
  console.log();
  console.log(success(`  cd ${projectName}`));
  console.log(success('  yarn start'));
  console.log();
}

/**
 * 拷贝模板文件
 *
 * @param {string} projectDir
 * @returns
 */
async function copyTemplateFiles(projectDir: string) {
  try {
    console.log('Initializing project content...');
    await fs.copy(path.resolve(path.join(__dirname, '../../template')), projectDir, {
      overwrite: true
    });
    console.log(`Initializing project content. ${successBlock(' done ')}`);
  } catch (err) {
    console.error(err);
  }
}

/** reaplace pkg.json name */
async function replacePkgConfig() {
  const projectPkg = fs.readJsonSync(path.resolve(process.cwd(), 'package.json'));
  projectPkg.name = projectName;
  fs.writeJsonSync('./package.json', projectPkg, {
    spaces: 2,
    EOL: os.EOL
  });
}
