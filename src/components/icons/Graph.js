import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Graph(props) {
  return (
    <Svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M10.0425 8.23504L13 3.14394V10.7062V12H0V0.355795H1.3V8.46792L4.875 2.2965L9.1 4.74178L11.856 0L12.9805 0.6469L9.581 6.50135L5.3495 4.07547L1.5015 10.7062H2.9705L5.824 5.81563L10.0425 8.23504Z"
        fill="#3275BB"
      />
    </Svg>
  );
}
