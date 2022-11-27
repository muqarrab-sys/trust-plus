import {Text} from 'react-native';
import React from 'react';
import moment from 'moment';
import {applicationProperties} from '@src/application.properties';

function CommonTime({...rest}) {
  const {children} = {...rest};
  return (
    <Text {...rest}>
      {moment
        .utc(children, 'YYYY-MM-DD HH:mm:ss a')
        .local()
        .format(applicationProperties.TIME_FORMAT)}
    </Text>
  );
}
export default CommonTime;
