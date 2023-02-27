import fs from 'fs';
import packageJson from '../package.json';
import { DIST_PATH } from './constants';

export function writePackageJson(version?: string) {
  fs.writeFileSync(
    `${DIST_PATH}/package.json`,
    JSON.stringify(
      {
        ...packageJson,
        version: version ?? packageJson.version,
        scripts: {},
        devDependencies: {},
        bin: {
          'upload-zip': './index.js',
        },
        main: `./index.js`,
        module: './index.js',
        types: `./index.d.ts`,
      },
      null,
      2
    )
  );
  console.info('Package.json was written');
}
