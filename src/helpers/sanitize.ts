const sanitize = (str: string) => str?.replace(/(&nbsp;|<([^>]+)>)/gi, '');

export default sanitize;
