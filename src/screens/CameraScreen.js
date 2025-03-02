// screens/CameraScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState('granted');
  const [cameraType, setCameraType] = useState('back');
  const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await CameraView.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);


  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        navigation.navigate('Canvas', { photoUri: photo.uri });
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
        console.error(error);
      }
    }
  };

  const toggleCameraType = () => {
    setCameraType(current => 
      current === 'back' 
        ? 'front' 
        : 'back'
    );
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView 
        style={styles.camera} 
        type={cameraType}
        ref={cameraRef}
      >
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.flipButton} 
            onPress={toggleCameraType}
          >
            <Text style={styles.flipText}>Flip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={takePicture}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
</CameraView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    alignItems: 'flex-end',
  },
  flipButton: {
    alignSelf: 'flex-end',
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginBottom: 10,
  },
  flipText: {
    fontSize: 16,
    color: 'white',
  },
  captureButton: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'white',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});