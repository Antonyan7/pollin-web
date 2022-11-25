/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore - this is a script, not a module
// @ts-nocheck

const shell = require('shelljs');
const fs = require('fs');

const cypressIdsFile = fs.readFileSync('./src/assets/cypress/ids.txt', 'utf8');
const cypressIdsFilePath = 'src/constants/cypressIds.ts';

const toUpperCase = (line: string): string => line.toUpperCase().replace(/\./g, '_');

const generateEnumLine = (key: string): void => {
  shell.ShellString(` ${toUpperCase(key)} = "${key}",\n`).toEnd(cypressIdsFilePath);
};

const generateCypressIdsEnum = (): void => {
  shell.ShellString('/* AUTO GENERATED FILE. DO NOT MODIFY !!! */\n\n').to(cypressIdsFilePath);

  const keys = cypressIdsFile.split('\n').map((line) => line.replace('\r', '').trim());

  shell.ShellString('export enum CypressIds {\n').toEnd(cypressIdsFilePath);

  keys.forEach(generateEnumLine);

  shell.ShellString('}\n\n').toEnd(cypressIdsFilePath);
  shell.ShellString('/* AUTO GENERATED FILE. DO NOT MODIFY !!! */').toEnd(cypressIdsFilePath);
};

generateCypressIdsEnum();

shell.exec(`prettier --write ${cypressIdsFilePath}`);
