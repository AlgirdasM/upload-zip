# upload-zip

This Node.js library is designed to archive a directory into a ZIP file and then upload it
to an API. If you're looking for a simple solution to archive a folder and upload it
through a CLI using an API, this library might be what you need. I couldn't find an existing
ibrary that met my requirements, so I created this one and am sharing it as an
open-source project.

## How to use it

Install library with npm(or other node package manager) `npm install upload-zip --save-dev`
and use it for example like this: `upload-zip --url=http://localhost:8080/api/file`

## Additional Headers and Additional Form Data

There properties are separated by key:value string.
For example to pass additionalHeaders and additionalFormData:

`upload-zip --url=localhost:8080/api/file --additionalHeaders="authorization: Bearer token" --additionalFormData="createdBy:automation" `

Also you can pass multiple data by using option again.

## Available options

```
  --help                Show help
                        [boolean]
  --version             Show version number
                        [boolean]
  --url                 The URL to send the file to
                        [string] [required]
  --method              Method to use post or put
                        [string] [default: "post"]
  --fileKey              The key to use for the file in the form data
                        [string] [default: "file"]
  --additionalFormData  Additional form data to send with the file
                        [array]
  --additionalHeaders   Additional headers to send with the request
                        [array]
  --fileName             The file name to save archived data to
                        [string] [default: "dist.zip"]
  --folderPath          The folder path to compress
                        [string] [default: "dist"]
```

## Develop

When developing create branch from develop and create pull request to it. After merging to develop, it will create alpha version.

## Release

Releases are based on semantic version. After release develop will be bumped by one patch release - as a smallest increment possible.
To make a release update develop branch with:

```
npm run release:major
npm run release:minor
npm run release:patch
```

Depending on changes. Create pull request to main branch and merge.

## Licenses and huge thank you

- [archiver](https://github.com/archiverjs/node-archiver)
- [axios](https://github.com/axios/axios)
- [eslint](https://eslint.org/)
- [form-data](https://github.com/form-data/form-data)
- [husky](https://github.com/typicode/husky)
- [prettier](https://prettier.io/)
- [ts-node](https://github.com/TypeStrong/ts-node)
- [typescript](https://www.typescriptlang.org)
- [yargs](https://github.com/yargs/yargs)
