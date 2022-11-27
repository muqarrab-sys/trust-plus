import * as React from 'react';
import Svg, {Path,Circle} from 'react-native-svg';
import {useSelector} from 'react-redux';

function Grid(props) {
  const {focused} = props;
  const {theme} = useSelector(state => state.ThemeReducer);
    let bg = 'none';
    let stroke = theme.alternativeTextColor;
    if (focused) {
        stroke = theme.buttonColor1;
    }
  return (
      <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill={bg}
          stroke={stroke}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="prefix__feather prefix__feather-grid"
          {...props}
      >
          <Path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
      </Svg>
  );
}

export default Grid;
