import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {useSelector} from "react-redux";

function Dex(props) {
    const {focused} = props;
    const {theme} = useSelector(state => state.ThemeReducer);
    let bg = 'none';
    let stroke = theme.alternativeTextColor;
    if (focused) {
        stroke = theme.textColor4;
    }
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill={bg}
            stroke={stroke}
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prefix__feather prefix__feather-repeat"
            {...props}
        >
            <Path d="M17 1l4 4-4 4" />
            <Path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" />
            <Path d="M21 13v2a4 4 0 01-4 4H3" />
        </Svg>
    )
}

export default Dex
