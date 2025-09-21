import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#1A531A', '#7CAE0C']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1A531A" />
      
      {/* Skip Button */}
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => navigation.navigate('Login' as never)}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>CC</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>CivicConnect</Text>
          <Text style={styles.subtitle}>Make Your City Better</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Report civic issues, track progress, and be part of the community making positive changes
        </Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Onboarding' as never)}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  skipButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  getStartedButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  getStartedText: {
    color: '#1A531A',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;