#!/usr/bin/env node

import { error, warning, success, packageUtil } from 'rocketact-dev-utils';

import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

import * as Mustache from 'mustache';
import { promisify } from 'util';

const validatePackageName = require('validate-npm-package-name'); // tslint:disable-line
const promisifiedGlob = promisify(require('glob')); // tslint:disable-line
const promisifiedFsReadFile = promisify(require('fs').readFile); // tslint:disable-line

import program from 'commander';
import chalk from 'chalk';

import * as packageJson from '../../package.json';

/** 项目名称 */
let projectName: string | undefined;

program
  .version(packageJson.version)
  .arguments('<project-directory>')
  .description('rocketact will help you create <project-directory> [options]')
  .option('-t, --template', 'Project Template')
  .option('-V, --version', 'Show Rocketact Version')
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`Only ${chalk.green('<project-directory>')} is required.`);
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

  await copyTemplateContent(root);

  process.chdir(root);
  try {
    await packageUtil.install();
  } catch (error) {
    console.log(error);
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

/**
 * 替换模板内容
 *
 * @param {string} projectDir
 * @returns
 */
async function copyTemplateContent(projectDir: string) {
  try {
    const files = await promisifiedGlob(path.join(projectDir, '**/*.tpl'));
    return Promise.all(
      files.map(async (file: any) => {
        const tpl = await promisifiedFsReadFile(file);
        const tplContent = await Mustache.render(tpl.toString(), {
          projectName: path.basename(projectDir)
        });
        await fs.outputFile(file.replace(/\.tpl$/, ''), tplContent);
        await fs.remove(file);
      })
    );
  } catch (err) {
    console.log(err);
  }
}
