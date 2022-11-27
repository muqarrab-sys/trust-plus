import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function Card(props) {
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
            className="prefix__feather prefix__feather-credit-card"
            {...props}
        >
            <Rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
            <Path d="M1 10h22" />
        </Svg>
    )
}

export default Card
