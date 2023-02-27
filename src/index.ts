#!/usr/bin/env node
import yargs from 'yargs';
import { uploadBuild } from './upload-build';
import { archiveBuild } from './archive-build';
import { DEFAULT_FILE_KEY, DEFAULT_FILENAME, DEFAULT_FOLDER_PATH, DEFAULT_METHOD } from './constants';
import { Method } from './types';

const parser = yargs(process.argv.slice(2))
  .option('url', {
    description: 'The URL to send the file to',
    type: 'string',
    demandOption: true,
  })
  .option('method', {
    description: 'Method to use post or put',
    type: 'string',
    default: DEFAULT_METHOD,
  })
  .option('fileKey', {
    description: 'The key to use for the file in the form data',
    type: 'string',
    default: DEFAULT_FILE_KEY,
  })
  .option('additionalFormData', {
    description: 'Additional form data to send with the file',
    type: 'array',
  })
  .option('additionalHeaders', {
    description: 'Additional headers to send with the request',
    type: 'array',
  })
  .option('fileName', {
    description: 'The file name to save archived data to',
    type: 'string',
    default: DEFAULT_FILENAME,
  })
  .option('folderPath', {
    description: 'The folder path to compress',
    type: 'string',
    default: DEFAULT_FOLDER_PATH,
  });
(async () => {
  try {
    const argv = await parser.argv;

    if (!argv.url) {
      console.error('Error: url key is missing');
      return;
    }

    if (!['post', 'put'].includes(argv.method)) {
      console.error('Error: we support only post or put method');
      return;
    }

    const { fileName } = await archiveBuild({
      folderPath: argv.folderPath,
      fileName: argv.fileName,
    });

    await uploadBuild({
      url: argv.url,
      fileKey: argv.fileKey,
      filePath: fileName,
      additionalFormData: argv.additionalFormData as string[],
      additionalHeaders: argv.additionalHeaders as string[],
      method: argv.method as Method,
    });
  } catch (e) {
    console.error(e);
  }
})();
