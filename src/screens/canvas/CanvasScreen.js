import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Dimensions, 
  Alert,
  Platform 
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';

import DrawingCanvas from '../../components/DrawingCanvas';
import StickerSelector from '../../components/StickerSelector';
import StickerItem from '../../components/StickerItem';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import styles from './styles';

const { width, height } = Dimensions.get('window');

export default function CanvasScreen({ route, navigation }) {
  const { photoUri } = route.params;
  const [caption, setCaption] = useState('');
  const [showStickerSelector, setShowStickerSelector] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const viewShotRef = useRef(null);

  // Handle adding a new sticker
  const handleAddSticker = (stickerImage) => {
    setStickers([
      ...stickers,
      {
        id: Date.now().toString(),
        source: stickerImage,
        position: { x: 0, y: 0 },
      },
    ]);
    setShowStickerSelector(false);
  };

  // Handle updating a sticker's position
  const updateStickerPosition = (id, newPosition) => {
    setStickers(
      stickers.map((sticker) =>
        sticker.id === id ? { ...sticker, position: newPosition } : sticker
      )
    );
  };

  // Share to Instagram Stories

  const shareToInstagram = async () => {
    try {
      // 1. Capture image
      const uri = await viewShotRef.current.capture();
      
      // 2. Prepare image file
      const preparedUri = await FileSystem.getContentUriAsync(uri);
      
      // 3. Platform-specific sharing
      if (Platform.OS === 'ios') {
        const instagramUrl = `instagram-stories://share?source_application=com.sami.InteractivePhotoCanvas&backgroundImage=${encodeURIComponent(preparedUri)}`;
        
        const canOpen = await Linking.canOpenURL(instagramUrl);
        if (canOpen) {
          await Linking.openURL(instagramUrl);
        } else {
          await Sharing.shareAsync(preparedUri);
        }
      } else {
        // Android Intent
        try {
          console.log('Sharing URI:', preparedUri);
          await IntentLauncher.startActivityAsync('com.instagram.share.ADD_TO_STORY', {
            data: preparedUri,
            type: 'image/jpeg',
            flags: 1, 
            packageName: 'com.instagram.android'
          });
        } catch (error) {
          // Fallback to system share
          await Sharing.shareAsync(preparedUri);
          Alert.alert('Open Instagram to create a story');
        }
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      Alert.alert('Error sharing to Instagram Stories');
    }
  };

  // Discard and go back to camera
  const handleDiscard = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ViewShot 
        ref={viewShotRef}
        style={styles.viewShot}
        options={{ format: 'jpg', quality: 0.9 }}
      >

        <Image source={{ uri: photoUri }} style={styles.photo} />
        

        {isDrawingMode && (
          <DrawingCanvas 
            width={width} 
            height={height} 
          />
        )}
        
        {stickers.map((sticker) => (
          <StickerItem
            key={sticker.id}
            sticker={sticker.source}
            initialPosition={sticker.position}
            onPositionChange={(newPosition) => 
              updateStickerPosition(sticker.id, newPosition)
            }
          />
        ))}
      </ViewShot>
      
      {/* Bottom controls */}
      <View style={styles.controlsContainer}>
        <TextInput
          style={styles.captionInput}
          placeholder="Write a caption..."
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={caption}
          onChangeText={setCaption}
          multiline
        />
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.drawButton, isDrawingMode && styles.activeButton]} 
            onPress={() => setIsDrawingMode(!isDrawingMode)}
          >
            <Text style={styles.buttonText}>
              {isDrawingMode ? 'Drawing On' : 'Draw'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setShowStickerSelector(true)}
          >
            <Text style={styles.buttonText}>Add Sticker</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.discardButton]} 
            onPress={handleDiscard}
          >
            <Text style={styles.buttonText}>Discard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.shareButton]} 
            onPress={shareToInstagram}
          >
            <Text style={styles.buttonText}>Share to IG</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Sticker selector modal */}
      {showStickerSelector && (
        <StickerSelector 
          onSelect={handleAddSticker} 
          onClose={() => setShowStickerSelector(false)} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewShot: {
    flex: 1,
    position: 'relative',
  },
  photo: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15, // Account for iOS bottom notch
  },
  captionInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    color: 'white',
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#3897f0', // Instagram blue
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  drawButton: {
    backgroundColor: '#9b59b6', // Purple
  },
  activeButton: {
    backgroundColor: '#8e44ad', // Darker purple when active
    borderWidth: 1,
    borderColor: 'white',
  },
  discardButton: {
    backgroundColor: '#7f8c8d', // Gray
  },
  shareButton: {
    backgroundColor: '#e74c3c', // Red like Instagram
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});