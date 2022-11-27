import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowDown(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prefix__feather prefix__feather-arrow-down"
            {...props}
        >
            <Path d="M12 5v14M19 12l-7 7-7-7" />
        </Svg>
    )
}

export default ArrowDown
