/* @ts-ignore */
/* eslint-disable */
const write = (backgroundColor: string, fontColor: string, text: any, ...args: any[]) => {
  const consoleArgs: string[] = [
    ``,
    `background: ${'#c8c8ff'};`,
    `background: ${'#9696ff'};`,
    `color: ${fontColor}; background: ${backgroundColor};`,
    `background: ${'#9696ff'};`,
    `background: ${'#c8c8ff'};`
  ];

  const isString: boolean = typeof text === 'string';

  !isString && args.unshift(text);

  consoleArgs[0] = `%c %c %c ${isString ? text : 'log'} %c %c`;

  if (args.length) {
    console.groupCollapsed(...consoleArgs);

    for (const arg of args) {
      console.log(arg);
    }

    console.groupEnd();
  } else {
    console.log(...consoleArgs);
  }

  return true;
};
const writeTrace = (backgroundColor: string, fontColor: string, text: any, ...args: any[]) => {
  const consoleArgs: string[] = [
    ``,
    `background: ${'#c8c8ff'};`,
    `background: ${'#9696ff'};`,
    `color: ${fontColor}; background: ${backgroundColor};`,
    `background: ${'#9696ff'};`,
    `background: ${'#c8c8ff'};`
  ];

  consoleArgs[0] = `%c %c %c ${text} %c %c`;

  if (args.length) {
    console.groupCollapsed(...consoleArgs);
    console.trace('log trace');

    for (const arg of args) {
      console.log(arg);
    }

    console.groupEnd();
  } else {
    console.log(...consoleArgs);
  }

  return true;
};

export const blueLog = (...args: any[]): boolean => write('#0000ff', '#ffffff', args.shift(), ...args);

export const skyBlueLog = (...args: any[]): boolean => write('#00bfff', '#000000', args.shift(), ...args);

export const whiteLog = (...args: any[]): boolean => write('#ffffff', '#000000', args.shift(), ...args);

export const blackLog = (...args: any[]): boolean => write('#000000', '#ffffff', args.shift(), ...args);

export const brownLog = (...args: any[]): boolean => write('#654321', '#ffffff', args.shift(), ...args);

export const pinkLog = (...args: any[]): boolean => write('#9F1DB4', '#ffffff', args.shift(), ...args);

export const greyLog = (...args: any[]): boolean => write('#8e8e8e', '#ffffff', args.shift(), ...args);

export const greenLog = (...args: any[]): boolean => write('#308751', '#ffffff', args.shift(), ...args);

export const redLog = (...args: any[]): boolean => write('#ff0000', '#ffffff', args.shift(), ...args);

export const errorLog = (...args: any[]): boolean => writeTrace('#ff0000', '#ffffff', args.shift(), ...args);
