import { GlobalToken, theme } from 'antd';

import { themeConfig } from '@shared/constants';

const { useToken, getDesignToken } = theme;

export const useGlobalToken = (): GlobalToken => useToken().token;
export const globalToken = getDesignToken(themeConfig);
