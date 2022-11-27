import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useSelector} from 'react-redux';

function Bell(props) {
  const {focused} = props;
  const {theme} = useSelector(state => state.ThemeReducer);
    let bg = 'none';
    let stroke = theme.textColor6;
    if (focused) {
        stroke = theme.textColor6;
    }
  return (
      <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill={bg}
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="prefix__feather prefix__feather-bell"
          {...props}
      >
        <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </Svg>
  );
}

export default Bell;
