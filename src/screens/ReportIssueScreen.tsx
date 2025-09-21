import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import LinearGradient from 'react-native-linear-gradient';

import { RootState } from '../store';
import { addIssue } from '../store/slices/issuesSlice';
import { addNotification } from '../store/slices/appSlice';
import { Issue } from '../types';

const audioRecorderPlayer = new AudioRecorderPlayer();

const ReportIssueScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { darkMode } = useSelector((state: RootState) => state.app);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'roads',
    landmark: '',
    image: null as string | null,
  });

  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    { id: 'roads', name: 'Roads & Transportation', icon: 'directions-car' },
    { id: 'sanitation', name: 'Sanitation', icon: 'delete' },
    { id: 'water', name: 'Water', icon: 'water-drop' },
    { id: 'lighting', name: 'Street Lighting', icon: 'lightbulb' },
  ];

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.8 as const,
      maxWidth: 1024,
      maxHeight: 1024,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        setFormData(prev => ({
          ...prev,
          image: response.assets![0].uri!,
        }));
      }
    });
  };

  const startRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      setAudioPath(result);
      setIsRecording(true);
      setRecordingTime(0);

      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Could not start recording');
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
      audioRecorderPlayer.removeRecordBackListener();
    } catch (error) {
      Alert.alert('Error', 'Could not stop recording');
    }
  };

  const clearRecording = () => {
    setAudioPath(null);
    setRecordingTime(0);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.image) {
      Alert.alert('Error', 'Please provide a title and image');
      return;
    }

    const newIssue: Issue = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category as any,
      status: 'submitted',
      date: new Date().toISOString().split('T')[0],
      image: formData.image,
      audio: audioPath || undefined,
      landmark: formData.landmark || undefined,
      upvotes: 0,
      userId: currentUser?.id || '1',
      location: {
        lat: 23.3441 + Math.random() * 0.01,
        lng: 85.3096 + Math.random() * 0.01,
      },
    };

    dispatch(addIssue(newIssue));
    dispatch(addNotification({
      id: Date.now().toString(),
      title: 'Issue Reported Successfully',
      description: `Your report "${formData.title}" has been submitted`,
      date: new Date().toISOString(),
      type: 'success',
    }));

    Alert.alert('Success', 'Issue reported successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('MyReports' as never) }
    ]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <LinearGradient
        colors={['#1A531A', '#7CAE0C']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Report Issue</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo Section */}
        <View style={styles.section}>
          <Text style={[styles.label, darkMode && styles.darkText]}>Add Photo *</Text>
          {formData.image ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: formData.image }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setFormData(prev => ({ ...prev, image: null }))}
              >
                <Icon name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
              <Icon name="camera-alt" size={48} color="#9CA3AF" />
              <Text style={styles.imagePickerText}>Open Camera</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        <View style={styles.section}>
          <Text style={[styles.label, darkMode && styles.darkText]}>Title *</Text>
          <TextInput
            style={[styles.input, darkMode && styles.darkInput]}
            value={formData.title}
            onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
            placeholder="Brief description of the issue"
            placeholderTextColor={darkMode ? '#9CA3AF' : '#6B7280'}
          />
        </View>

        {/* Description & Audio */}
        <View style={styles.section}>
          <Text style={[styles.label, darkMode && styles.darkText]}>Description</Text>
          <TextInput
            style={[styles.textArea, darkMode && styles.darkInput]}
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            placeholder="Detailed description of the issue..."
            placeholderTextColor={darkMode ? '#9CA3AF' : '#6B7280'}
            multiline
            numberOfLines={4}
          />

          {/* Audio Recorder */}
          <View style={[styles.audioContainer, darkMode && styles.darkAudioContainer]}>
            <Text style={[styles.audioLabel, darkMode && styles.darkText]}>
              Or record audio (max 1 minute)
            </Text>
            
            {!isRecording && !audioPath && (
              <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
                <Icon name="mic" size={20} color="white" />
                <Text style={styles.recordButtonText}>Start Recording</Text>
              </TouchableOpacity>
            )}

            {isRecording && (
              <View style={styles.recordingContainer}>
                <View style={styles.recordingInfo}>
                  <View style={styles.recordingDot} />
                  <Text style={[styles.recordingText, darkMode && styles.darkText]}>Recording...</Text>
                  <Text style={[styles.recordingTime, darkMode && styles.darkSubtext]}>
                    {formatTime(recordingTime)}
                  </Text>
                </View>
                <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
                  <Icon name="stop" size={16} color="white" />
                  <Text style={styles.stopButtonText}>Stop</Text>
                </TouchableOpacity>
              </View>
            )}

            {audioPath && (
              <View style={styles.audioPlayback}>
                <Text style={[styles.audioPlaybackText, darkMode && styles.darkText]}>
                  Audio recorded ({formatTime(recordingTime)})
                </Text>
                <TouchableOpacity onPress={clearRecording}>
                  <Text style={styles.clearAudioText}>Clear</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={[styles.label, darkMode && styles.darkText]}>Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  formData.category === category.id && styles.activeCategoryButton,
                ]}
                onPress={() => setFormData(prev => ({ ...prev, category: category.id }))}
              >
                <Icon
                  name={category.icon}
                  size={20}
                  color={formData.category === category.id ? 'white' : '#6B7280'}
                />
                <Text style={[
                  styles.categoryText,
                  formData.category === category.id && styles.activeCategoryText,
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Landmark */}
        <View style={styles.section}>
          <Text style={[styles.label, darkMode && styles.darkText]}>Landmark (Optional)</Text>
          <View style={styles.inputContainer}>
            <Icon name="location-on" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={[styles.inputWithIcon, darkMode && styles.darkInput]}
              value={formData.landmark}
              onChangeText={(text) => setFormData(prev => ({ ...prev, landmark: text }))}
              placeholder="Near landmark or address"
              placeholderTextColor={darkMode ? '#9CA3AF' : '#6B7280'}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, (!formData.title || !formData.image) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!formData.title || !formData.image}
        >
          <LinearGradient
            colors={['#1A531A', '#7CAE0C']}
            style={styles.submitButtonGradient}
          >
            <Text style={styles.submitButtonText}>Submit Report</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  darkText: {
    color: '#F9FAFB',
  },
  darkSubtext: {
    color: '#9CA3AF',
  },
  imagePicker: {
    height: 200,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 16,
    color: '#6B7280',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  darkInput: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    color: '#F9FAFB',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  audioContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  darkAudioContainer: {
    backgroundColor: '#374151',
  },
  audioLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  recordButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  recordingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  recordingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginRight: 8,
  },
  recordingTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B7280',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  stopButtonText: {
    color: 'white',
    marginLeft: 4,
    fontSize: 12,
  },
  audioPlayback: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioPlaybackText: {
    fontSize: 14,
    color: '#374151',
  },
  clearAudioText: {
    fontSize: 14,
    color: '#EF4444',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    minWidth: 120,
  },
  activeCategoryButton: {
    backgroundColor: '#1A531A',
  },
  categoryText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: 'white',
  },
  inputIcon: {
    marginLeft: 16,
  },
  inputWithIcon: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ReportIssueScreen;