import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Remove({fill = '#8C8C8C', opacity, ...props}) {
  return (
    <Svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/Svg" {...props}>
      <Path
        d="M37 33.59L35.59 35L32 31.41L28.41 35L27 33.59L30.59 30L27 26.41L28.41 25L32 28.59L35.59 25L37 26.41L33.41 30L37 33.59ZM40 21C40.5304 21 41.0391 21.2107 41.4142 21.5858C41.7893 21.9609 42 22.4696 42 23V37C42 37.5304 41.7893 38.0391 41.4142 38.4142C41.0391 38.7893 40.5304 39 40 39H25C24.31 39 23.77 38.64 23.41 38.11L18 30L23.41 21.88C23.77 21.35 24.31 21 25 21H40ZM40 23H25L20.28 30L25 37H40V23Z"
        fill={fill}
        opacity={opacity}
      />
    </Svg>
  );
}
