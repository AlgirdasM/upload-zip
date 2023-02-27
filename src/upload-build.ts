import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { DEFAULT_FILE_KEY, DEFAULT_FILENAME, DEFAULT_METHOD } from './constants';
import { Method } from './types';

export interface UploadBuildParams {
  url: string;
  method?: Method;
  filePath?: string;
  fileKey?: string;
  additionalFormData?: string[];
  additionalHeaders?: string[];
}

const jsonKeyRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

export const uploadBuild = async ({
  url,
  additionalFormData,
  additionalHeaders,
  filePath = `./${DEFAULT_FILENAME}`,
  fileKey = DEFAULT_FILE_KEY,
  method = DEFAULT_METHOD,
}: UploadBuildParams) => {
  const formData = new FormData();
  const file = fs.createReadStream(filePath);
  const generatedHeaders: Record<string, string> = {};

  if (!jsonKeyRegex.test(fileKey)) {
    throw new Error('fileKey is invalid');
  }

  formData.append(fileKey, file);

  if (Array.isArray(additionalFormData)) {
    additionalFormData.forEach(data => {
      const value = data.split(':');

      if (value.length !== 2) {
        throw new Error('additionalFormData is invalid');
      }

      formData.append(value[0], value[1]);
    });
  }

  if (Array.isArray(additionalHeaders)) {
    additionalHeaders.forEach(data => {
      const value = data.split(':');

      if (value.length !== 2) {
        throw new Error('additionalHeaders is invalid');
      }

      generatedHeaders[value[0]] = value[1];
    });
  }

  console.log(additionalHeaders);

  file.on('error', error => {
    throw error;
  });

  file.on('open', () => {
    formData.getLength((error, length) => {
      if (error) {
        throw error;
      }

      const headers = {
        ...generatedHeaders,
        ...formData.getHeaders(),
        'Content-Length': length,
      };

      if (method === 'post') {
        axios
          .post(url, formData, { headers })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            throw error;
          });
      } else {
        axios
          .put(url, formData, { headers })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            throw error;
          });
      }
    });
  });
};
