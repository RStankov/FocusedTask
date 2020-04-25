const packager = require('electron-packager');
const setLanguages = require('electron-packager-languages');

packager({
  dir: './shell',
  overwrite: true,
  out: './dist',
  afterCopy: [setLanguages(['en', 'en_GB'])],
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
  name: 'Focused Task',
  appBundleId: 'com.rstankov.focused-task',
  appCopyright: 'Copyright (C) 2020 Radoslav Stankov',
  appVersion: 'Version 0.1',
  buildVersion: 'Build 1',
  appCategoryType: 'public.app-category.productivity',
  // icon: '',
});
