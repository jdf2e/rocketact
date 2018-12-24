#!/usr/bin/env node

const validateProjectName = require('validate-npm-package-name');
const { error, warning, success, packageUtil } = require('rocketact-dev-utils');

const fs = require('fs-extra');
const path = require('path');
const os = require('os');

const Mustache = require('mustache');
const promisify = require('util.promisify');
const promisifiedGlob = promisify(require('glob'));
const promisifiedFsReadFile = promisify(require('fs').readFile);

const program = require('commander');
const chalk = require('chalk');
const packageJson = require('../../package.json');

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

createProject(projectName as string);

/**
 * 校验项目名称
 *
 * @param {string} projectName
 */
function checkProjectName(projectName: string): void {
  const validationResult = validateProjectName(projectName);
  if (!validationResult.validForNewPackages) {
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(0);
  }
}

function printValidationResults(results: [string]) {
  if (typeof results !== 'undefined') {
    results.forEach((error) => {
      console.error(chalk.red(`  *  ${error}`));
    });
  }
}

async function createProject(projectName: string) {
  const root = path.resolve(projectName);
  const appName = path.basename(root);

  checkProjectName(appName);

  fs.ensureDirSync(appName);

  await copyTemplateFiles(root);

  await copyTemplateContent(root);

  process.chdir(root);
  packageUtil.install();
}

/**
 * 拷贝模板文件
 *
 * @param {string} projectDir
 * @returns
 */
async function copyTemplateFiles(projectDir: string) {
  try {
    return await fs.copySync(path.join(__dirname, '../../template'), projectDir, {
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
        await fs.outputFileSync(file.replace(/\.tpl$/, ''), tplContent);
        await fs.remove(file);
      })
    );
  } catch (err) {
    console.log(err);
  }
}
