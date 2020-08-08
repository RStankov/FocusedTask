const packager = require('electron-packager');
const setLanguages = require('electron-packager-languages');
const createDMG = require('electron-installer-dmg');
const version = require('../shell/package.json').version;

const distPath = './dist';
const name = 'FocusedTask';

const credentials = require('../credentials.json');

packager({
  dir: './shell',
  overwrite: true,
  out: distPath,
  afterCopy: [setLanguages(['en', 'en_GB'])],
  name,
  productName: 'Focused Task',
  appBundleId: 'com.rstankov.focused-task',
  appCopyright: 'Copyright (C) 2020 Radoslav Stankov',
  appVersion: version,
  appCategoryType: 'public.app-category.productivity',
  icon: './assets/Icon.icns',
  osxSign: {
    identity: credentials.identity,
    'hardened-runtime': true,
    entitlements: 'entitlements.plist',
    'entitlements-inherit': 'entitlements.plist',
    'signature-flags': 'library',
  },
  osxNotarize: credentials.osxNotarize,
}).then(() => {
  console.log('Creating the dmg package');
  createDMG(
    {
      appPath: `${distPath}/${name}-darwin-x64/${name}.app`,
      name: `${name}-${version}`,
      out: './dist',
      overwrite: 'true',
    },
    error => {
      if (error) {
        console.error(error);
      } else {
        console.log('Packaging completed successfully');
      }
    },
  );
});
