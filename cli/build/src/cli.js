import { exec } from 'child_process'
import path from 'path'
const { Observable } = require('rxjs')
const arg = require('arg')
const inquirer = require('inquirer')
const fs = require('fs')
const Listr = require('listr')

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--chrome': Boolean,
      '--firefox': Boolean,
      '--zip': Boolean,
      '--version': Boolean,
      '--minor': Boolean,
      '--major': Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  )

  return {
    chrome: args['--chrome'],
    firefox: args['--firefox'],
    zip: args['--zip'] || null,
    version: args['--version'],
    minor: args['--minor'],
    major: args['--major'],
  }
}

function getBrowser(options) {
  if (options.chrome) return 'Chrome'

  if (options.firefox) return 'Firefox'

  return null
}

async function promptForMissingOptions(options) {
  const questions = []

  const browser = getBrowser(options)

  if (!browser) {
    questions.push({
      type: 'list',
      name: 'browser',
      message: 'Which browser will you use?',
      default: 'Chrome',
      choices: ['Chrome', 'Firefox'],
    })
  }

  if (options.zip === null) {
    questions.push({
      type: 'confirm',
      name: 'zip',
      message: 'Do you want to zip the file?',
      default: false,
    })
  }

  const answers = await inquirer.prompt(questions)

  return {
    zip: options.zip || answers.zip,
    browser: browser || answers.browser,
  }
}

function writingManifestJson(manifest) {
  const icons = { ...manifest.icons }

  icons['32'] = icons['48']

  manifest.background = {
    scripts: ['background.js'],
  }
  manifest.manifest_version = 2
  manifest.page_action = {
    default_popup: 'index.html',
    default_icon: icons['32'],
  }
  manifest.browser_action = {
    default_popup: 'index.html',
    default_icon: icons['32'],
    default_title: 'Save4Me',
  }

  delete manifest.host_permissions
  delete manifest.action
  delete manifest.key
}

function buildFrontend() {
  return new Observable((observer) => {
    exec('cd frontend && yarn build', (error) => {
      if (error) observer.error()

      observer.complete()
    })
  })
}

function zipFile() {
  return new Observable((observer) => {
    exec('cd frontend && yarn zip:firefox', (error) => {
      if (error) observer.error()

      observer.complete()
    })
  })
}

function deleteExistingManifest() {
  try {
    fs.unlinkSync(path.join(__dirname, '..', '..', '..', 'frontend/public/manifest.json'))

    return undefined
  } catch (error) {
    return 'Skipping because file does not exist'
  }
}

function upVersion(manifest, options) {
  if (!options.minor && !options.major) {
    throw new Error('You must specify --minor or --major')
  }

  manifest.version = manifest.version.split('.')

  if (options.minor) {
    manifest.version[2] = Number(manifest.version[2]) + 1
  }

  if (options.major) {
    manifest.version[0] = Number(manifest.version[0]) + 1
  }

  manifest.version = manifest.version.join('.')

  const defaultManifest = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', '..', '..', 'frontend/public/manifest.default.json'), 'utf-8')
  )

  defaultManifest.version = manifest.version

  fs.writeFileSync(
    path.join(__dirname, '..', '..', '..', 'frontend/public/manifest.default.json'),
    JSON.stringify(defaultManifest, null, 2)
  )
}

export async function cli(args) {
  const options = parseArgumentsIntoOptions(args)

  const { browser, zip } = await promptForMissingOptions(options)

  const defaultManifest = fs.readFileSync(
    path.join(__dirname, '..', '..', '..', 'frontend/public/manifest.default.json'),
    'utf-8'
  )

  const manifest = JSON.parse(defaultManifest)

  // @ts-ignore
  const tasks = new Listr([
    {
      title: 'Writing in manifest.json',
      task: () => writingManifestJson(manifest),
      skip: () => (browser === 'Chrome' ? 'Skipping writing for chrome' : undefined),
    },
    {
      title: 'Updating version',
      task: () => upVersion(manifest, options),
      skip: () => (!options.version ? 'Pass --version to update version' : undefined),
    },
    {
      title: 'Deleting existing manifest.json',
      task: () => deleteExistingManifest(),
      skip: () => deleteExistingManifest(),
    },
    {
      title: 'Writing manifest.json',
      task: () =>
        fs.writeFileSync(
          path.join(__dirname, '..', '..', '..', 'frontend/public/manifest.json'),
          JSON.stringify(manifest, null, 2)
        ),
    },
    {
      title: 'Building',
      task: buildFrontend,
    },
    {
      title: 'Ziping',
      task: zipFile,
      skip: () => (!zip ? 'Pass --zip to zip file' : undefined),
    },
  ])

  tasks.run()
}
