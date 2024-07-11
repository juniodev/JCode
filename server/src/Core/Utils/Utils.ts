import os from 'os';

class Utils {
  static getPrompt() {
    const userInfo = os.userInfo();
    const user = userInfo.username;
    const isRoot = userInfo.uid === 0;
    const hostname = os.hostname();
    const currentDir = process.cwd();
    const prompt = `${isRoot ? 'root' : user}@${hostname}:~${currentDir}${isRoot ? '#' : '$'} `;
    return prompt;
  }
}

export default Utils;
