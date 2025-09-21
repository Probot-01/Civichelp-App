import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';

import { RootState } from '../store';
import { Issue } from '../types';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { issues } = useSelector((state: RootState) => state.issues);
  const { darkMode, notifications } = useSelector((state: RootState) => state.app);

  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Issues', icon: 'list' },
    { id: 'roads', name: 'Roads', icon: 'directions-car' },
    { id: 'sanitation', name: 'Sanitation', icon: 'delete' },
    { id: 'water', name: 'Water', icon: 'water-drop' },
    { id: 'lighting', name: 'Lighting', icon: 'lightbulb' },
  ];

  const filteredIssues = selectedDepartment === 'all' 
    ? issues 
    : issues.filter(issue => issue.category === selectedDepartment);

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'submitted': return '#EF4444';
      case 'in-progress': return '#F59E0B';
      case 'resolved': return '#10B981';
      default: return '#6B7280';
    }
  };

  const mockNews = [
    {
      id: '1',
      title: 'City Council Approves New Park Project',
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '2',
      title: 'Community Clean-Up Event Scheduled',
      image: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '3',
      title: 'New Traffic Regulations Implemented',
      image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];

  const stats = {
    totalIssues: issues.length,
    resolvedIssues: issues.filter(i => i.status === 'resolved').length,
    avgResponseTime: '2d 5h',
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <LinearGradient
        colors={['#1A531A', '#7CAE0C']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>CC</Text>
            </View>
            <View>
              <Text style={styles.headerSubtitle}>CivicConnect</Text>
              <Text style={styles.headerTitle}>Citizen Dashboard</Text>
            </View>
          </View>
          
          <View style={styles.headerRight}>
            <View style={styles.locationContainer}>
              <Icon name="location-on" size={16} color="white" />
              <Text style={styles.locationText}>Ranchi, Jharkhand</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => navigation.navigate('Notifications' as never)}
              >
                <Icon name="notifications" size={24} color="white" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <View style={styles.notificationBadge} />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileButton}>
                <Image
                  source={{ uri: currentUser?.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Map Card */}
        <View style={[styles.card, darkMode && styles.darkCard]}>
          <Text style={[styles.cardTitle, darkMode && styles.darkText]}>Issues Near You</Text>
          
          {/* Department Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
            {departments.map((dept) => (
              <TouchableOpacity
                key={dept.id}
                style={[
                  styles.filterButton,
                  selectedDepartment === dept.id && styles.activeFilterButton,
                ]}
                onPress={() => setSelectedDepartment(dept.id)}
              >
                <Icon 
                  name={dept.icon} 
                  size={16} 
                  color={selectedDepartment === dept.id ? 'white' : '#6B7280'} 
                />
                <Text style={[
                  styles.filterText,
                  selectedDepartment === dept.id && styles.activeFilterText,
                ]}>
                  {dept.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Map */}
          <TouchableOpacity
            style={styles.mapContainer}
            onPress={() => navigation.navigate('ExpandedMap' as never)}
          >
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 23.3441,
                longitude: 85.3096,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              {filteredIssues.map((issue) => (
                <Marker
                  key={issue.id}
                  coordinate={{
                    latitude: issue.location.lat,
                    longitude: issue.location.lng,
                  }}
                  pinColor={getMarkerColor(issue.status)}
                  onPress={() => navigation.navigate('IssueDetail' as never, { issueId: issue.id } as never)}
                />
              ))}
            </MapView>
          </TouchableOpacity>
          
          <Text style={[styles.mapInfo, darkMode && styles.darkText]}>
            Showing {filteredIssues.length} issues • Tap markers for details
          </Text>
        </View>

        {/* Report Issue Card */}
        <TouchableOpacity
          style={[styles.card, styles.reportCard, darkMode && styles.darkCard]}
          onPress={() => navigation.navigate('ReportIssue' as never)}
        >
          <View style={styles.reportContent}>
            <View style={styles.reportIconContainer}>
              <Icon name="camera-alt" size={32} color="#1A531A" />
            </View>
            <View style={styles.reportTextContainer}>
              <Text style={[styles.reportTitle, darkMode && styles.darkText]}>Report an Issue</Text>
              <Text style={[styles.reportSubtitle, darkMode && styles.darkSubtext]}>
                Take a photo and report civic problems
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Civic News */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Civic News</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockNews.map((news) => (
              <View key={news.id} style={[styles.newsCard, darkMode && styles.darkCard]}>
                <Image source={{ uri: news.image }} style={styles.newsImage} />
                <Text style={[styles.newsTitle, darkMode && styles.darkText]}>{news.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Stats */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Quick Stats</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.statCard, darkMode && styles.darkCard]}>
              <Icon name="trending-up" size={24} color="#3B82F6" />
              <Text style={[styles.statNumber, darkMode && styles.darkText]}>{stats.totalIssues}</Text>
              <Text style={[styles.statLabel, darkMode && styles.darkSubtext]}>Total Issues</Text>
            </View>
            
            <View style={[styles.statCard, darkMode && styles.darkCard]}>
              <Icon name="check-circle" size={24} color="#10B981" />
              <Text style={[styles.statNumber, darkMode && styles.darkText]}>{stats.resolvedIssues}</Text>
              <Text style={[styles.statLabel, darkMode && styles.darkSubtext]}>Resolved</Text>
            </View>
            
            <View style={[styles.statCard, darkMode && styles.darkCard]}>
              <Icon name="schedule" size={24} color="#F59E0B" />
              <Text style={[styles.statNumber, darkMode && styles.darkText]}>{stats.avgResponseTime}</Text>
              <Text style={[styles.statLabel, darkMode && styles.darkSubtext]}>Avg Response</Text>
            </View>
          </ScrollView>
        </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    marginRight: 12,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1F2937',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  darkText: {
    color: '#F9FAFB',
  },
  darkSubtext: {
    color: '#9CA3AF',
  },
  filtersContainer: {
    marginBottom: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#1A531A',
  },
  filterText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  activeFilterText: {
    color: 'white',
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  map: {
    flex: 1,
  },
  mapInfo: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  reportCard: {
    backgroundColor: '#F0FDF4',
  },
  reportContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  reportTextContainer: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  reportSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  newsCard: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 120,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    padding: 12,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default DashboardScreen;