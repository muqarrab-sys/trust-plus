import CommonHeader from '@components/commons/CommonHeader';
import CommonImage from '@components/commons/CommonImage';
import CommonText from '@components/commons/CommonText';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

const data = [
  {
    id: '1',
    isSeen: false,
    title: 'Test Notification 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: '2',
    isSeen: true,
    title: 'Test Notification 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: '3',
    isSeen: true,
    title: 'Test Notification 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
];

export default function NotificationScreen({navigation}) {
  const lang = useSelector(state => state?.LanguageReducer?.language);
  const {theme} = useSelector(state => state.ThemeReducer);

  function ListEmptyComponent(params) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CommonImage source={require('@assets/images/EmptyNotification.png')} />
        <CommonText style={[styles.emptyNotificationText, {color: theme.textColor7}]}>{lang.yourNotificationsWillShowHere}</CommonText>
        <CommonTouchableOpacity>
          <CommonText style={[styles.copyButton, {color: theme.buttonColor1}]}>{lang.refresh}</CommonText>
        </CommonTouchableOpacity>
      </View>
    );
  }

  function renderItem({item}) {
    return (
      <CommonTouchableOpacity style={{flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 20}}>
        <View style={{flex: 8}}>
          <CommonText style={{fontSize: 18, fontWeight: '700', color: item.isSeen ? theme.textColor7 : 'black'}}>{item.title}</CommonText>
          <CommonText style={{fontSize: 12, color: item.isSeen ? theme.textColor7 : 'black'}}>{item.description}</CommonText>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: theme.backgroundColor2}} />
        </View>
      </CommonTouchableOpacity>
    );
  }

  return (
    <View style={{flexGrow: 1}}>
      <CommonHeader onPressBack={() => navigation.goBack()} title="Notification" />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: theme.textColor7}} />}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  copyButton: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyNotificationText: {
    marginVertical: 20,
  },
});
