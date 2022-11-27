import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Chart(props) {
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
            className="prefix__feather prefix__feather-bar-chart-2"
            {...props}
        >
            <Path d="M18 20V10M12 20V4M6 20v-6" />
        </Svg>
    )
}

export default Chart
