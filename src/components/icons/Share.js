import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {useSelector} from "react-redux";

function Share(props) {
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
            className="prefix__feather prefix__feather-share"
            {...props}
        >
            <Path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
        </Svg>
    )
}

export default Share
