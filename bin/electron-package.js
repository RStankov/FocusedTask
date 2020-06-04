const packager = require('electron-packager');
const setLanguages = require('electron-packager-languages');
const createDMG = require('electron-installer-dmg');

const version = '0.1.0';
const distPath = './dist';
const name = 'FocusedTask';

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
  icon: './shell/assets/Icon.icns',
  // osxSign: {
  //   identity: '[?]',
  //   'hardened-runtime': true,
  //   entitlements: 'entitlements.plist',
  //   'entitlements-inherit': 'entitlements.plist',
  //   'signature-flags': 'library',
  // },
  // osxNotarize: {
  //   appleId: '[?]',
  //   appleIdPassword: '[?]',
  // },
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
