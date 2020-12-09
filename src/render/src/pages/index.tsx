import React from 'react';
import ElectronThirdlogin from '../components/ElectronThirdlogin';
import Style from './style.scss';

export default () => {
  return (
    <div className={Style.box}>
      <div className={Style.thirdlogin}>
        第三方登录
        <ElectronThirdlogin
          width={150}
          loginUrl="http://52.76.113.244/wx/pcLoginUrl"
          onLogin={(res) => console.log(res)}
        />
      </div>
    </div>
  );
};
