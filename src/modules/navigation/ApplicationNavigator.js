import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeAction} from '@persistence/theme/ThemeAction';
import {LanguageAction} from '@persistence/language/LanguageAction';
import StackNavigator from '@modules/navigation/StackNavigator';
import AuthenticationStackNavigator from '@modules/navigation/AuthenticationStackNavigator';

function ApplicationNavigator() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {loggedIn} = useSelector(state => state.UserReducer);
    useEffect(() => {
        dispatch(ThemeAction.getDefault()).then(() => {
            dispatch(LanguageAction.getDefault()).then(() => {
                setLoading(false);
            });
        });
    });
    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        );
    }
    return (
        <NavigationContainer>
            {
                loggedIn ? <StackNavigator/> : <AuthenticationStackNavigator/>
            }
        </NavigationContainer>
    );
}

export default ApplicationNavigator;
