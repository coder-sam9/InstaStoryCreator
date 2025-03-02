// components/StickerItem.js
import React, { useState, useRef } from 'react';
import { StyleSheet, Image, Animated, PanResponder } from 'react-native';

export default function StickerItem({ sticker, initialPosition, onPositionChange, onRemove }) {
  const pan = useRef(new Animated.ValueXY(initialPosition)).current;
  const [scale] = useState(new Animated.Value(1));
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.spring(scale, {
        toValue: 1.1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    },
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
      
      if (onPositionChange) {
        onPositionChange({ x: pan.x._value, y: pan.y._value });
      }
    },
  });

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: pan.x },
          { translateY: pan.y },
          { scale },
        ],
      }}
      {...panResponder.panHandlers}
    >
      <Image source={sticker} style={styles.sticker} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sticker: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});