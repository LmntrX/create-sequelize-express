#!/usr/bin/env node

/**
 * Copyright (c) 2018-present, Lmntrx Tech.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// create-sequelize-express is installed globally on people's computers. This means
// that it is extremely difficult to have them upgrade the version and
// because there's only one global version installed, it is very prone to
// breaking changes.
//
// If you need to add a new command, please add it to the scripts/ folder.
//
// The only reason to modify this file is to add more warnings and
// troubleshooting information for the `create-sequelize-express` command.
//
// Do not make breaking changes! We absolutely don't want to have to
// tell people to update their global version of create-sequelize-express.
//
// Also be careful with new language features.
// This file must work on Node 6+.
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

"use strict";

const validateProjectName = require("validate-npm-package-name");
const chalk = require("chalk");
const commander = require("commander");
const fs = require("fs-extra");
const Promise = require("bluebird");
const fs_promise = Promise.promisifyAll(require("fs"));
const envinfo = require("envinfo");
const execSync = require("child_process").execSync;
const spawn = require("cross-spawn");
const targz = require("targz");
const os = require("os");
const path = require("path");

const packageJson = require("./package.json");

let projectName;

// These files should be allowed to remain on a failed install,
// but then silently removed during the next create.
const errorLogFilePatterns = [
  "npm-debug.log",
  "yarn-error.log",
  "yarn-debug.log"
];

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments(`<project-directory>`)
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action(name => {
    projectName = name;
  })
  .option("--verbose", "print additional logs")
  .option("--info", "print environment debug info")
  .allowUnknownOption()
  .on("--help", () => {
    console.log(`    Only ${chalk.green("<project-directory>")} is required.`);
    console.log();
    console.log(
      `    If you have any problems, do not hesitate to file an issue:`
    );
    console.log(
      `      ${chalk.cyan(
        "https://github.com/LmntrX/create-sequelize-express/issues/new"
      )}`
    );
    console.log();
  })
  .parse(process.argv);

if (program.info) {
  console.log(chalk.bold("\nEnvironment Info:"));
  return envinfo
    .run(
      {
        System: ["OS", "CPU"],
        Binaries: ["Node", "npm", "Yarn"],
        Browsers: ["Chrome", "Edge", "Internet Explorer", "Firefox", "Safari"],
        npmGlobalPackages: ["create-sequelize-express"]
      },
      {
        clipboard: true,
        duplicates: true,
        showNotFound: true
      }
    )
    .then(console.log)
    .then(() => console.log(chalk.green("Copied To Clipboard!\n")));
}

if (typeof projectName === "undefined") {
  console.error("Please specify the project directory:");
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`
  );
  console.log();
  console.log("For example:");
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green("lx-sequelize-express-app")}`
  );
  console.log();
  console.log(
    `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
  );
  process.exit(1);
}

function printValidationResults(results) {
  if (typeof results !== "undefined") {
    results.forEach(error => {
      console.error(chalk.red(`  *  ${error}`));
    });
  }
}

createApp(projectName, program.verbose);

function moveAllFiles(srcDir, destDir) {
  return fs_promise.readdirAsync(srcDir).map(function(file) {
    var destFile = path.join(destDir, file);
    console.log(destFile);
    return fs_promise
      .renameAsync(path.join(srcDir, file), destFile)
      .then(function() {
        return destFile;
      });
  });
}

function createApp(name, verbose) {
  const root = path.resolve(name);
  const appName = path.basename(root);
  checkAppName(appName);

  fs.ensureDirSync(name);

  if (!isSafeToCreateProjectIn(root, name)) {
    process.exit(1);
  }

  console.log(`Creating a new Sequelize-Express app in ${chalk.green(root)}.`);
  console.log();

  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
    description: "",
    main: "app.js",
    scripts: {
      test: "nyc mocha --exit --recursive",
      start: "node ./bin/www",
      deploy: "./deploy.sh",
      "start:dev": "nodemon ./bin/www"
    },
    repository: {
      type: "git",
      url: ""
    },
    author: "Author Name",
    license: "",
    homepage: "",
    dependencies: {
      "bcrypt-nodejs": "0.0.3",
      "body-parser": "^1.19.0",
      cors: "^2.8.5",
      express: "^4.17.1",
      jsonwebtoken: "^8.5.1",
      morgan: "^1.9.0",
      pg: "^7.17.1",
      "pg-hstore": "^2.3.3",
      sequelize: ">=5.3.0"
    },
    devDependencies: {
      chai: "^4.2.0",
      "chai-http": "^4.3.0",
      mocha: "^5.2.0",
      nyc: "^13.1.0"
    }
  };
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );
  const originalDirectory = process.cwd();
  process.chdir(root);
  fs.copySync(require.resolve("./arch.tar.gz"), path.join(root, "arch.tar.gz"));
  targz.decompress(
    {
      src: path.join(root, "arch.tar.gz"),
      dest: root
    },
    function(err) {
      if (err) {
        console.log(chalk.red(`Error extracting files...`));
      } else {
        moveAllFiles(path.join(root, "arch"), root)
          .then(files => {
            console.log(chalk.blue(`Completed extracting files...`));
            console.log(chalk.blue(`Installing dependencies...`));
            spawn("npm", ["install"], { stdio: "inherit" });
            fs.renameSync(
              path.join(root, ".gitignore-skeleton"),
              path.join(root, ".gitignore")
            );
            console.log(chalk.blue(`Cleaning up...`));
            spawn("find", [".", "-name", "._*", "-delete"]);
            spawn("rm", ["arch.tar.gz"]);
            spawn("rm", ["-rf", "arch"]);
            spawn("npm", ["install", "-g", "sequelize-cli"]);
            console.log("Setup Complete.");
            console.log();
            console.log(
              `NB: See ${chalk.yellow(
                "src/config/config.json"
              )} to setup your environment`
            );
            console.log();
            console.log(
              `After setting up the environment, run ${chalk.yellow(
                "sequelize db:migrate"
              )} in '${chalk.yellow(
                projectName
              )}' directory to create user model in the database`
            );
            console.log();
          })
          .catch(error => console.error(error));
      }
    }
  );
}

function checkAppName(appName) {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${appName}"`
      )} because of npm naming restrictions:`
    );
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }

  // TODO: there should be a single place that holds the dependencies
  const dependencies = [
    "sequelize",
    "create-sequelize-express",
    "express"
  ].sort();
  if (dependencies.indexOf(appName) >= 0) {
    console.error(
      chalk.red(
        `We cannot create a project called ${chalk.green(
          appName
        )} because a dependency with the same name exists.\n` +
          `Due to the way npm works, the following names are not allowed:\n\n`
      ) +
        chalk.cyan(dependencies.map(depName => `  ${depName}`).join("\n")) +
        chalk.red("\n\nPlease choose a different project name.")
    );
    process.exit(1);
  }
}

// If project only contains files generated by GH, it’s safe.
// Also, if project contains remnant error logs from a previous
// installation, lets remove them now.
// We also special case IJ-based products .idea because it integrates with CSE
function isSafeToCreateProjectIn(root, name) {
  const validFiles = [
    ".DS_Store",
    "Thumbs.db",
    ".git",
    ".gitignore",
    ".idea",
    "README.md",
    "LICENSE",
    "web.iml",
    ".hg",
    ".hgignore",
    ".hgcheck",
    ".npmignore",
    "mkdocs.yml",
    "docs",
    ".travis.yml",
    ".gitlab-ci.yml",
    ".gitattributes"
  ];
  console.log();

  const conflicts = fs
    .readdirSync(root)
    .filter(file => !validFiles.includes(file))
    // Don't treat log files from previous installation as conflicts
    .filter(
      file => !errorLogFilePatterns.some(pattern => file.indexOf(pattern) === 0)
    );

  if (conflicts.length > 0) {
    console.log(
      `The directory ${chalk.green(name)} contains files that could conflict:`
    );
    console.log();
    for (const file of conflicts) {
      console.log(`  ${file}`);
    }
    console.log();
    console.log(
      "Either try using a new directory name, or remove the files listed above."
    );

    return false;
  }

  // Remove any remnant files from a previous installation
  const currentFiles = fs.readdirSync(path.join(root));
  currentFiles.forEach(file => {
    errorLogFilePatterns.forEach(errorLogFilePattern => {
      // This will catch `(npm-debug|yarn-error|yarn-debug).log*` files
      if (file.indexOf(errorLogFilePattern) === 0) {
        fs.removeSync(path.join(root, file));
      }
    });
  });
  return true;
}
