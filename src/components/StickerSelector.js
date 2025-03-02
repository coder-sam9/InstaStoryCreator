// components/StickerSelector.js
import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Text } from 'react-native';

export default function StickerSelector({ onSelect, onClose }) {
  // Import stickers - this would be dynamically loaded from your sticker library
  const stickers = [
    require('../assets/stickers/sticker1.png'),
    require('../assets/stickers/sticker2.png'),
    // Add more stickers as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Choose a Sticker</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.stickerRow}>
          {stickers.map((sticker, index) => (
            <TouchableOpacity
              key={index}
              style={styles.stickerButton}
              onPress={() => onSelect(sticker)}
            >
              <Image source={sticker} style={styles.sticker} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 18,
  },
  stickerRow: {
    flexDirection: 'row',
    padding: 10,
  },
  stickerButton: {
    margin: 5,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
  },
  sticker: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});