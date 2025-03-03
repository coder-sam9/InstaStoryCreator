import { StyleSheet } from "react-native";

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
export default styles;