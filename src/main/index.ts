import url from 'url';
import { join } from 'path';
import isDev from 'electron-is-dev';

import GreatApp from './base/GreatApp';
import GreatWinConfig from './base/GreatWinConfig';
import { GreatDLL, GreatLog, GreatTray, GreatUpdater } from './base/plugins';

// 配置
// GreatWinConfig.openDevTool = true;

const great = new GreatApp(
  isDev
    ? 'http://localhost:8000'
    : url.format({
        pathname: join(__dirname, '../dist/render/index.html'),
        protocol: 'file:',
        slashes: true
      }),
  {
    width: 800,
    height: 600,
    webPreferences: {
      webviewTag: true,
      enableRemoteModule: true,
      nodeIntegration: true,
      preload: join(__dirname, './public/preload/render.js')
    }
  }
);

// 安装插件
const trayPlugin = new GreatTray([
  {
    label: 'Exit',
    click: () => great.quit()
  }
]);
great.usePlugin([new GreatLog(), trayPlugin]);

// 启动
great.start(() => {
  console.info('app started');
});

export default great;
