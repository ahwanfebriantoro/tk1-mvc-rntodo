import React, {useRef} from 'react';
import Video, {VideoRef} from 'react-native-video';
import {assets} from '../../assets';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

const Premium = () => {
  const videoRef = useRef<VideoRef>(null);
  const background = assets.chickenPremium;

  return (
    <>
      <Video
        repeat
        controls={false}
        muted
        hideShutterView
        resizeMode="cover"
        // Can be a URL or a local file.
        source={background}
        // Store reference
        ref={videoRef}
        // Callback when remote video is buffering
        onBuffer={e => console.log(e.isBuffering)}
        // Callback when video cannot be loaded
        onError={e => console.log(e.error)}
        style={styles.backgroundVideo}
      />
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: 0.8,
          flex: 1,
          backgroundColor: 'lightgray',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'gold',
            fontSize: 30,
          }}>
          UNDER CONSTRUCTION
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          UNDER CONSTRUCTION
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'gold',
            fontSize: 30,
          }}>
          UNDER CONSTRUCTION
        </Text>
      </View>
    </>
  );
};

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    objectFit: 'cover',
    height: '100%',
    opacity: 0.1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Premium;
