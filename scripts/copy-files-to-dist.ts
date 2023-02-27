import fs from 'fs';
import { DIST_PATH } from './constants';

const FILES = ['README.md', 'LICENSE'];

export function copyFilesToDist() {
  FILES.forEach(file => {
    fs.copyFile(file, `${DIST_PATH}/${file}`, error => {
      if (error) throw error;
      console.log(`${file} was copied`);
    });
  });
}
