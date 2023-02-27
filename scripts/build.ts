import { writePackageJson } from './write-package-json';
import { copyFilesToDist } from './copy-files-to-dist';

export const build = () => {
  writePackageJson();
  copyFilesToDist();
};

build();
