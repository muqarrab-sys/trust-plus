import React from 'react'
import Svg, {Path, Line} from 'react-native-svg';

export default function Send(props) {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <Line x1="8" y1="23" x2="22" y2="23" stroke="white" stroke-width="2"/>
        <Path d="M10.2377 13.2618C10.0855 13.1095 10 12.9029 10 12.6874C10 12.472 10.0855 12.2653 10.2377 12.113L14.4308 7.23789C14.5831 7.08557 14.7896 7 15.0049 7C15.2202 7 15.4267 7.08557 15.579 7.23789L19.7721 12.113C19.92 12.2662 20.0018 12.4714 20 12.6845C19.9981 12.8975 19.9127 13.1013 19.7622 13.252C19.6116 13.4026 19.408 13.488 19.1951 13.4899C18.9822 13.4917 18.7771 13.4099 18.6239 13.2618L15.8169 9.77374L15.8169 18.1875C15.8169 18.403 15.7313 18.6096 15.5791 18.762C15.4268 18.9144 15.2203 19 15.0049 19C14.7896 19 14.583 18.9144 14.4308 18.762C14.2785 18.6096 14.1929 18.403 14.1929 18.1875L14.1929 9.77374L12.7894 11.5178L11.3859 13.2618C11.2336 13.4142 11.0271 13.4997 10.8118 13.4997C10.5965 13.4997 10.39 13.4142 10.2377 13.2618Z" fill="white"/>
    </Svg>
  )
}
