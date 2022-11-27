import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {useSelector} from "react-redux";

function ICO(props) {
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
            className="feather feather-octagon"
            {...props}
        >
            <Path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z" />
        </Svg>
    )
}

export default ICO
