import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RootState } from '../store';
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MyReportsScreen from '../screens/MyReportsScreen';
import ReportIssueScreen from '../screens/ReportIssueScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import IssueDetailScreen from '../screens/IssueDetailScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ExpandedMapScreen from '../screens/ExpandedMapScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const darkMode = useSelector((state: RootState) => state.app.darkMode);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          
          switch (route.name) {
            case 'Dashboard':
              iconName = 'home';
              break;
            case 'MyReports':
              iconName = 'assignment';
              break;
            case 'ReportIssue':
              iconName = 'camera-alt';
              break;
            case 'Community':
              iconName = 'people';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1A531A',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
          borderTopColor: darkMode ? '#374151' : '#E5E7EB',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="MyReports" component={MyReportsScreen} options={{ title: 'My Reports' }} />
      <Tab.Screen 
        name="ReportIssue" 
        component={ReportIssueScreen} 
        options={{ 
          title: 'Report',
          tabBarIcon: ({ focused, color }) => (
            <Icon 
              name="camera-alt" 
              size={30} 
              color={color}
              style={{
                backgroundColor: focused ? '#1A531A' : '#7CAE0C',
                borderRadius: 25,
                padding: 10,
                marginBottom: 10,
              }}
            />
          ),
        }} 
      />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="ExpandedMap" component={ExpandedMapScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;