import { defineConfig } from 'umi';

const path = require('path');
const resolvePath = (dir: string) => path.join(__dirname, dir);

export default defineConfig({
  // 标题
  title: 'bit-electron-thirdlogin',
  // node_modules下依赖文件的编译方式
  nodeModulesTransform: {
    type: 'none'
  },
  outputPath: '../../dist/render',
  // 浏览器适配
  targets: {
    chrome: 79,
    firefox: false,
    safari: 10,
    edge: false,
    ios: false
  },
  // 路径别名
  alias: {
    '@components': resolvePath('components'),
    '@pages': resolvePath('pages')
  },
  // 国际化
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-'
  }
});
