import { createFromIconfontCN } from '@ant-design/icons';
import type { IconFontProps } from '@ant-design/icons/es/components/IconFont';
import { FC } from 'react';

const _Icon = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_2804385_83hu1tclz1n.js',
});

export interface IProps extends IconFontProps {
  size?: number;
  color?: string;
  styleName?: string;
}

const WIcon: FC<IProps> = (props) => {
  const { type, size = 14, color, style, ...rest } = props;
  return <_Icon type={`icon-${type}`} style={{ color, fontSize: size, ...style }} {...rest} />;
};

export default WIcon;
