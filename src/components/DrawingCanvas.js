// components/DrawingCanvas.js
import React, { useState } from 'react';
import { StyleSheet, View, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function DrawingCanvas({ width, height, onLineDrawn }) {
  const [currentPath, setCurrentPath] = useState('');
  const [paths, setPaths] = useState([]);
  const [currentColor] = useState('#FF0000'); // Default color - red
  const [currentStrokeWidth] = useState(5);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      const newPath = `M ${locationX} ${locationY}`;
      setCurrentPath(newPath);
    },
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      setCurrentPath(prevPath => `${prevPath} L ${locationX} ${locationY}`);
    },
    onPanResponderRelease: () => {
      if (currentPath) {
        const newPaths = [...paths, { 
          path: currentPath, 
          color: currentColor,
          strokeWidth: currentStrokeWidth
        }];
        setPaths(newPaths);
        if (onLineDrawn) {
          onLineDrawn(newPaths);
        }
        setCurrentPath('');
      }
    }
  });

  return (
    <View 
      style={[
        styles.canvas, 
        { width, height }
      ]} 
      {...panResponder.panHandlers}
    >
      <Svg width="100%" height="100%">
        {paths.map((item, index) => (
          <Path
            key={`path-${index}`}
            d={item.path}
            stroke={item.color}
            strokeWidth={item.strokeWidth}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
        {currentPath && (
          <Path
            d={currentPath}
            stroke={currentColor}
            strokeWidth={currentStrokeWidth}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});