import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {useSelector} from "react-redux";

function Dollar(props) {
    const {theme} = useSelector(state => state.ThemeReducer);
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            stroke={theme.buttonColor1}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prefix__feather prefix__feather-dollar-sign"
            {...props}
        >
            <Path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </Svg>
    )
}

export default Dollar
