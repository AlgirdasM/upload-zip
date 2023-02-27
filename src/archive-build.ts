import fs from 'fs';
import archiver from 'archiver';
import { DEFAULT_FILENAME, DEFAULT_FOLDER_PATH } from './constants';

export interface ArchiveBuildParams {
  folderPath?: string;
  fileName?: string;
}

const archive = async ({ folderPath = DEFAULT_FOLDER_PATH, fileName = DEFAULT_FILENAME }: ArchiveBuildParams) => {
  const output = fs.createWriteStream(fileName);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(folderPath, false);
  await archive.finalize();

  return {
    folderPath,
    fileName,
  };
};

export const archiveBuild = async ({
  folderPath = DEFAULT_FOLDER_PATH,
  fileName = DEFAULT_FILENAME,
}: ArchiveBuildParams) => {
  fs.stat(folderPath, (err, stats) => {
    if (err) {
      throw new Error(`${folderPath} does not exist`);
    } else if (stats.isDirectory()) {
      console.info(`${folderPath} is a directory, archiving`);
    } else {
      throw new Error(`${folderPath} is not a directory`);
    }
  });

  return archive({
    folderPath,
    fileName,
  });
};
