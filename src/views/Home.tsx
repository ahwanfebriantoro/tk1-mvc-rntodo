import {useNavigation} from '@react-navigation/native';
import {ImageBackground, TouchableHighlight} from 'react-native';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {assets} from '../assets';

export default function Home() {
  const navi = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
      }}>
      <TouchableHighlight
        style={{height: 200, maxWidth: '50%', flex: 1}}
        onPress={() => navi.navigate('Todo')}>
        <Card>
          <ImageBackground
            resizeMethod="auto"
            resizeMode="cover"
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={assets.todo}>
            <View
              style={{
                opacity: 0.8,
                backgroundColor: 'white',
                flex: 1,
                width: '100%',
                height: '100%',
              }}></View>
            <Text
              style={{position: 'absolute', fontSize: 30, fontWeight: 'bold'}}>
              TODO APP
            </Text>
          </ImageBackground>
        </Card>
      </TouchableHighlight>
      <TouchableHighlight
        style={{height: 200, maxWidth: '50%', flex: 1}}
        onPress={() => navi.navigate('Farm')}>
        <Card>
          <ImageBackground
            resizeMethod="auto"
            resizeMode="cover"
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={assets.farm}>
            <View
              style={{
                opacity: 0.8,
                backgroundColor: 'white',
                flex: 1,
                width: '100%',
                height: '100%',
              }}></View>
            <Text
              style={{position: 'absolute', fontSize: 30, fontWeight: 'bold'}}>
              FARM APP
            </Text>
          </ImageBackground>
        </Card>
      </TouchableHighlight>
    </View>
  );
}
