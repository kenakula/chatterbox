import { PropsWithChildren, ReactElement } from 'react';
import { ConfigProvider } from 'antd';

import { themeConfig } from '@shared/constants';

export const ThemeProvider = ({ children }: PropsWithChildren): ReactElement => {

  return (
    <ConfigProvider
      theme={themeConfig}
    >
      {children}
    </ConfigProvider>
  );
};
