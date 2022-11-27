import * as React from 'react';
import Svg, {Path,Circle} from 'react-native-svg';
import {useSelector} from 'react-redux';

function Wallet(props) {
  const {focused} = props;
  const {theme} = useSelector(state => state.ThemeReducer);
  let bg = theme.alternativeTextColor;
  let stroke = 'none';
  if (focused) {
    bg = theme.textColor4;
    stroke = 'none';
  }
  return (
      <Svg xmlns="http://www.w3.org/2000/svg"  fill={bg}
           stroke={stroke}
           strokeWidth={0.01} width={24} height={24} {...props}>
        <Path d="M11.203.133c-.867.293-8.187 2.98-8.36 3.062-.577.293-.945 1.04-.827 1.676.027.145.12.457.21.703.09.239.165.453.165.473 0 .02-.141.062-.309.094C1.453 6.258.77 6.727.418 7.27a3.808 3.808 0 00-.273.55l-.122.313-.015 6.773C0 21.536 0 21.684.094 22.046c.12.481.324.829.699 1.204.355.352.777.582 1.254.68.48.101 18.02.101 18.5 0a2.705 2.705 0 001.71-1.246c.305-.536.337-.801.337-2.606v-1.61h.11c.179 0 .585-.218.804-.445.12-.117.277-.335.344-.484l.125-.266v-4.546l-.122-.258a1.636 1.636 0 00-1.043-.914l-.195-.055-.023-1.684c-.028-1.664-.028-1.687-.145-1.996-.347-.89-1.101-1.535-1.996-1.687l-.34-.059-.011-1.058-.016-1.059-.156-.309a1.731 1.731 0 00-.797-.796l-.219-.11-4.969-.047-.308-.86C13.266.82 13.21.704 12.945.462A1.691 1.691 0 0011.922.02c-.27-.02-.387 0-.719.113zm.735 1.312c.066.04.148.22.363.825l.152.433-.383.031c-.32.016-.441.047-.675.172a1.68 1.68 0 00-.75.793c-.118.258-.122.29-.137 1.324l-.012 1.07H3.914l-.273-.734c-.239-.652-.262-.746-.2-.832.047-.074 1.145-.492 4.18-1.601 2.266-.832 4.152-1.512 4.191-1.516.04 0 .094.016.126.035zm6.69 2.754c.06.063.075.215.075.985v.91h-6.797v-.91c0-.77.016-.922.074-.985.067-.066.434-.074 3.325-.074 2.89 0 3.258.008 3.324.074zm1.778 3.367c.258.094.48.286.625.536l.133.218.016 1.578.011 1.582-1.628.012-1.633.016-.375.133c-1.192.414-2.032 1.296-2.348 2.468-.11.38-.117 1.313-.023 1.684.257 1.016.945 1.883 1.851 2.324.727.356.781.367 2.574.39l1.578.013v1.539c0 1.73-.015 1.832-.324 2.152a1.53 1.53 0 01-.355.266c-.184.093-.336.093-9.211.093s-9.027 0-9.211-.093a1.47 1.47 0 01-.356-.274c-.347-.355-.328.137-.316-7.25L1.43 8.32l.133-.218c.144-.25.367-.442.625-.536.265-.093 17.953-.093 18.218 0zm2.114 5.399c.066.062.074.316.074 2.02 0 1.75-.008 1.96-.078 2.038-.07.082-.2.086-2.098.086-2.188 0-2.305-.007-2.8-.261-.5-.254-.946-.844-1.067-1.418a2.112 2.112 0 01.984-2.242c.469-.282.559-.293 2.84-.293 1.824-.004 2.078.003 2.145.07zm0 0" />
        <Path d="M18.29 14.375c-.505.25-.497.984.015 1.234.11.051.242.094.304.094.211 0 .493-.18.606-.379.332-.59-.309-1.254-.926-.949zm0 0" />
      </Svg>
  );
}

export default Wallet;
