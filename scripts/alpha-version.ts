import * as cp from 'child_process';
import pkg from '../package.json';
import { writePackageJson } from './write-package-json';

function alphaVersion() {
  const curVer = pkg.version.trim().split(/[.-]/).slice(0, 3).join('.');
  const commit = cp.execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  const uniqueVer = `${curVer}-alpha-${commit}`;

  console.log(`Package: ${pkg.name}, Current Version: ${curVer}, Commit: ${commit}, New Version: ${uniqueVer}`);

  cp.execSync(`npm version ${uniqueVer} --no-git-tag-version`, { stdio: 'inherit' });

  writePackageJson(uniqueVer);
}

alphaVersion();
