import React from 'react';
import { Text, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PATHS } from '../types/enums/NavigationPath';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Splash from '../screens/auth/splash';
import Login from '../screens/auth/login';
import visits from '../screens/app/visits';
import Settings from '../screens/app/settings';
import Favorites from '../screens/app/favorites';
import VisitDetails from '../screens/app/visitDetails';
import theme from '../common/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import navigationService from '../navigation/services';

export default function App() {
    return (
        <NavigationContainer ref={(navigatorRef: any) => {
            navigationService.setContainer(navigatorRef);
        }}>
            <Stack.Navigator>
                <Stack.Screen
                    name={PATHS.SPLASH}
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={PATHS.LOGIN}
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={PATHS.VISITS}
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name={PATHS.VISITS} component={VisitStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name={'grid'}
                            size={32}
                            color={focused ? theme.colors.blue : theme.colors.black}
                        />
                    ),
                }} />
            <Tab.Screen name={PATHS.FAVORITES} component={FavoritesStack} options={{
                tabBarIcon: ({ focused, color }) => (
                    <Icon
                        name={'heart'}
                        size={32}
                        color={focused ? theme.colors.blue : theme.colors.black}
                    />
                ),
            }} />
            <Tab.Screen name={PATHS.SETTINGS} component={SettingsStack} options={{
                tabBarIcon: ({ focused, color }) => (
                    <Icon
                        name={'settings'}
                        size={32}
                        color={focused ? theme.colors.blue : theme.colors.black}
                    />
                ),
            }} />
        </Tab.Navigator>
    );
}


function Title({ title }: any) {
    return (
        <Text children={title} style={styles.titleText} />
    );
}
function HeaderRight() {
    return (
        <></>
    );
}

export function VisitStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={PATHS.VISITS}
                component={visits}
                options={{
                    headerTitle: props => <Title title={'My Visits'} />, headerLeft: null
                }}
            />
            <Stack.Screen
                name={PATHS.VISIT_DETAILS}
                component={VisitDetails}
                options={{
                    headerTitle: props => <Title
                        title={'Visit Details'} />,
                    headerRight: props => <HeaderRight />
                }}
            />
        </Stack.Navigator>
    );
}
export function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={PATHS.FAVORITES}
                component={Favorites}
                options={{
                    headerTitle: props => <Title title={'Favorites'} />, headerLeft: null
                }}
            />
            <Stack.Screen
                name={PATHS.VISIT_DETAILS}
                component={VisitDetails}
                options={{
                    headerTitle: props => <Title
                        title={'Favorites Details'} />,
                    headerRight: props => <HeaderRight />
                }}
            />
        </Stack.Navigator>
    );
}
export function SettingsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={PATHS.SETTINGS}
                component={Settings}
                options={{
                    headerTitle: props => <Title title={'Settings'} />, headerLeft: null
                }} />
        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({
    titleText: {
        textAlign: 'center',
        fontSize: theme.moderateScale(18),
        fontWeight: 'bold'
    }
})