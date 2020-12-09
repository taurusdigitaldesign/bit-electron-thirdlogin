import React, { useState, useEffect } from 'react';
import Style from './style.module.scss';

const ElectronThirdlogin = (props) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    const webView = document.querySelector('webview');
    webView.addEventListener('did-stop-loading', onWebViewChange);

    return () => {
      webView.removeEventListener('did-stop-loading', onWebViewChange);
    };
  }, []);

  const onWebViewChange = async (event) => {
    const webView = document.querySelector('webview');
    const url = webView.getURL();

    if (url.startsWith('https://open.weixin.qq.com/')) {
      const res = await webView.executeJavaScript(
        `
          var el = document.querySelector('.qrcode');
          Promise.resolve(el.getAttribute('src'));      
        `
      );

      setImgUrl(`https://open.weixin.qq.com${res}`);
    } else if (url.includes('api.quickfox.com.cn/wx/getWxInfo?code')) {
      const reg = /<\/?.+?\/?>/g;
      let res = await webView.executeJavaScript('Promise.resolve(document.body.innerHTML)');

      res = JSON.parse(res.replace(reg, ''));
      props.onLogin && props.onLogin(res.data);
    }
  };

  return (
    <div className={Style.box} style={{ width: `${props.width}px` }}>
      {imgUrl.length == 0 ? (
        <div className={Style.imgDiv} style={{ width: `${props.width}px` }}>
          loading
        </div>
      ) : (
        <img className={Style.imgDiv} style={{ width: `${props.width}px` }} src={imgUrl} />
      )}
      <webview src={props.loginUrl} style={{ width: '0px', height: '0px' }} />
    </div>
  );
};

export default ElectronThirdlogin;
