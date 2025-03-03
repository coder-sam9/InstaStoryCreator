import { StyleSheet } from "react-native";

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
export default styles;