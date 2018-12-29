#!/usr/bin/env node

import { error, warning, success, infoBlock, normalBlock, packageUtil } from 'rocketact-dev-utils';

import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

const validatePackageName = require('validate-npm-package-name'); // tslint:disable-line

import program from 'commander';
import * as packageJson from '../../package.json';

/** 项目名称 */
let projectName: string | undefined;

program
  .version(packageJson.version, '-v, --version, -V')
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
  console.log('Please specify the project directory:');
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
      console.error(chalk.red(`  *  ${result}`));
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
  try {
    // await packageUtil.install();
    console.log(success('Installing packages done.'));
  } catch (error) {
    console.log(error('Install packages failed. Please check.'));
  }
}

/**
 * 拷贝模板文件
 *
 * @param {string} projectDir
 * @returns
 */
async function copyTemplateFiles(projectDir: string) {
  try {
    await fs.copy(path.resolve(path.join(__dirname, '../../../template')), projectDir, {
      overwrite: true
    });
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
