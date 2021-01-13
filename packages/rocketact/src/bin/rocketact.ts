#!/usr/bin/env node

import {
  error,
  warning,
  success,
  info,
  infoBlock,
  errorBlock,
  normalBlock,
  successBlock,
  packageUtil
} from "rocketact-dev-utils";

import * as fs from "fs-extra";
import * as path from "path";
import * as os from "os";

const download = require('download');
const decompress = require('decompress');
const execa = require("execa");

const validatePackageName = require("validate-npm-package-name"); // tslint:disable-line

import prog from "caporal";
/** 项目名称 */
let projectName: string | undefined;

const projectMainPkg = fs.readJsonSync(
  path.resolve(__dirname, "../../package.json")
);

prog
  .version(projectMainPkg.version)
  .command("create", "create a new project")
  .argument("<directory>", "directory to create project")
  .option('--template <template>', 'custom template\'s name, ex. demo', prog.STRING)
  // @ts-ignore
  .action((args, options, logger) => {
    projectName = args.directory;

    if (!projectName) {
      console.log(error("Please specify the project directory!"));
      process.exit(0);
    }

    createProject(options.template);
  });

prog.parse(process.argv);
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
  if (typeof results !== "undefined") {
    results.forEach(result => {
      console.error(error(`  *  ${result}`));
    });
  }
}

async function createProject(template?: string) {
  checkProjectName();

  const root = path.resolve(projectName as string);
  const appName = path.basename(root);

  console.log(`Initializing project in ${success(root)}`);
  console.log();

  fs.ensureDirSync(appName);

  await copyTemplateFiles(root, template);

  process.chdir(root);

  await renameNpmignoreToGitignore();
  await replacePkgConfig();

  console.log("Installing packages. This might take a couple of minutes.");
  console.log(
    `Installing ${success("react")}, ${success("react-dom")}, and ${success(
      "rocketact-scripts"
    )}...`
  );
  console.log();

  await packageUtil.install();

  console.log();
  console.log(`${successBlock(" All things done. ")}`);
  console.log();
  console.log("Now you can:");
  console.log(success(`  cd ${projectName}`));
  console.log(success("  yarn start"));
  console.log();
  console.log("Happy hacking!");
}

/**
 * 拷贝模板文件
 *
 * @param {string} projectDir
 * @param {string} template 模板名称
 * @returns
 */
async function copyTemplateFiles(projectDir: string, template?: string) {
  try {
    if(template) {
      await copyTemplateFilesFromTemplate(projectDir, template)
      return;
    }
    await fs.copy(
      path.resolve(path.join(__dirname, "../../template")),
      projectDir,
      {
        overwrite: true
      }
    );
  } catch (err) {
    console.error(err);
  }
}

/**
 * 根据模板名称下载模板，并创建文件夹
 *
 * @param projectDir
 * @param template
 */
async function copyTemplateFilesFromTemplate(projectDir: string, template: string) {
  let tarDownloadUrl = '';
  try {
    const execaResult = await execa(`npm`, ['view', `rocketact-template-${template}`, 'dist.tarball']);
    tarDownloadUrl = execaResult.stdout;
  } catch (e) {
    console.log(`${errorBlock(' Error ')} Initial Falled.`);
    console.log(e)
    process.exit(1);
  }

  if(!tarDownloadUrl) {
    console.log(`${errorBlock(' Error ')} Initial Falled.`);
    process.exit(1);
  }

  await fs.writeFileSync(`${projectDir}/${template}.tgz`,
    await download(tarDownloadUrl));

  await decompress(`${projectDir}/${template}.tgz`, `${projectDir}`).then(async () =>{
    await fs.copySync(`${projectDir}/package/`, projectDir, { overwrite: true });

    await fs.removeSync(`${projectDir}/package/`);
    await fs.removeSync(`${projectDir}/${template}.tgz`);
  });
}

/**
 * Mannualy rename .npmignore to .gitignore
 *
 * This is because when publishing package, npm will rename .gitigonre to .npmignore (see npm/npm#1862)
 */
async function renameNpmignoreToGitignore() {
  try {
    const npmignoreExist = await fs.pathExists("./.npmignore");
    if (npmignoreExist) {
      await fs.rename(".npmignore", ".gitignore");
    }
  } catch (e) {
    // we do nothing here
  }
}

/** reaplace pkg.json name */
async function replacePkgConfig() {
  const projectPkg = fs.readJsonSync(
    path.resolve(process.cwd(), "package.json")
  );
  projectPkg.name = projectName;
  fs.writeJsonSync("./package.json", projectPkg, {
    spaces: 2,
    EOL: os.EOL
  });
}
