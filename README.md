# CivicConnect Mobile - React Native Android App

A comprehensive civic issue reporting mobile application built with React Native for Android devices.

## Features

- **User Authentication**: OTP-based login system
- **Issue Reporting**: Photo capture, audio recording, and detailed descriptions
- **Interactive Maps**: Real-time issue tracking with location markers
- **Community Engagement**: Upvoting and community interaction
- **Multi-language Support**: English and Hindi
- **Dark Mode**: Complete dark theme support
- **Offline Functionality**: Local data persistence
- **Push Notifications**: Real-time updates on issue status

## Tech Stack

- **Framework**: React Native 0.73.2
- **State Management**: Redux Toolkit with Redux Persist
- **Navigation**: React Navigation 6
- **Maps**: React Native Maps
- **Camera**: React Native Image Picker
- **Audio**: React Native Audio Recorder Player
- **Icons**: React Native Vector Icons
- **Animations**: React Native Reanimated

## Prerequisites

- Node.js (>= 18)
- React Native CLI
- Android Studio
- Android SDK (API Level 21+)
- Java Development Kit (JDK 11)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CivicConnectMobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (if targeting iOS)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android Setup**
   - Open Android Studio
   - Open the `android` folder as an Android project
   - Sync Gradle files
   - Ensure Android SDK and build tools are installed

## Running the App

### Development Mode

1. **Start Metro bundler**
   ```bash
   npm start
   ```

2. **Run on Android**
   ```bash
   npm run android
   ```

3. **Run on iOS** (if configured)
   ```bash
   npm run ios
   ```

### Building for Production

**Android APK**
```bash
npm run build:android
```

The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── store/             # Redux store and slices
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── services/          # API services
└── assets/            # Images, fonts, etc.
```

## Key Features Implementation

### 1. Issue Reporting
- Camera integration for photo capture
- Audio recording up to 1 minute
- Category selection (Roads, Sanitation, Water, Lighting)
- GPS location tagging
- Offline draft saving

### 2. Interactive Maps
- Real-time issue markers
- Status-based color coding (Red: Submitted, Yellow: In Progress, Green: Resolved)
- Department filtering
- Tap-to-view issue details

### 3. User Authentication
- Phone number + OTP verification
- Secure token storage
- Auto-login on app restart

### 4. Community Features
- Issue upvoting system
- Community feed with trending/latest tabs
- User engagement tracking

### 5. Notifications
- Local push notifications
- Issue status updates
- Community interaction alerts

## Permissions Required

- **Camera**: For issue photo capture
- **Microphone**: For audio recording
- **Location**: For GPS tagging of issues
- **Storage**: For saving photos and audio files
- **Internet**: For API communication

## Testing

### Device Testing
- Tested on Android API levels 21-34
- Optimized for screen sizes 4.7" to 6.7"
- Performance tested on low-end devices (2GB RAM)

### Emulator Testing
```bash
# Create Android emulator
avd create -n CivicConnect -k "system-images;android-30;google_apis;x86_64"

# Start emulator
emulator -avd CivicConnect
```

## Security Features

- Secure storage for user tokens
- Input validation and sanitization
- Image compression to prevent large uploads
- Audio recording time limits
- Permission-based feature access

## Performance Optimizations

- Image lazy loading
- Redux state persistence
- Efficient map rendering
- Memory leak prevention
- Battery usage optimization

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build failures**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **Permission errors**
   - Ensure all permissions are added to AndroidManifest.xml
   - Request runtime permissions for sensitive features

4. **Map not loading**
   - Check Google Maps API key configuration
   - Verify internet connectivity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

## Deployment

### Google Play Store
1. Generate signed APK
2. Create Play Console account
3. Upload APK with required metadata
4. Complete store listing
5. Submit for review

### Internal Distribution
- Use Android App Bundle (.aab) format
- Configure Firebase App Distribution
- Set up CI/CD pipeline for automated builds

## Version History

- **v1.0.0**: Initial release with core features
- **v1.1.0**: Added dark mode and multi-language support
- **v1.2.0**: Enhanced map functionality and performance improvements

---

**Built with ❤️ for better civic engagement**