import {useNavigation} from '@react-navigation/native';
import {
  ImageBackground,
  TouchableHighlight,
  ScrollView,
  View,
} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {assets} from '../../assets';
import {useAuthStore} from '../../db/authStore';

export default function Home() {
  const navi = useNavigation();

  const {user} = useAuthStore();

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{padding: 20, gap: 5}}>
        <Text style={{fontSize: 20}}>Halo, {user?.name} </Text>
        <Text>{"In case you forgot where you parked your farm… 🐄🚜 Here's a map! 😂"}</Text>
        <Button onPress={() => navi.navigate('Location')} mode='elevated'>See Map</Button>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'flex-start',
          margin: 20,
          flexWrap: 'wrap',
        }}>
        <TouchableHighlight
          style={{height: 200, width: '48%'}}
          onPress={() => navi.navigate('AnimalList', {type: 'cow'})}>
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
                style={{
                  position: 'absolute',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                Sapi
              </Text>
            </ImageBackground>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          style={{height: 200, width: '48%'}}
          onPress={() => navi.navigate('Premium', {type: 'sheep'})}>
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
              source={assets.lambs}>
              <View
                style={{
                  opacity: 0.8,
                  backgroundColor: 'white',
                  flex: 1,
                  width: '100%',
                  height: '100%',
                }}></View>
              <Text
                style={{
                  position: 'absolute',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                Kambing
              </Text>
            </ImageBackground>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          style={{height: 200, width: '48%'}}
          onPress={() => navi.navigate('Premium', {type: 'catfish'})}>
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
              source={assets.catfish}>
              <View
                style={{
                  opacity: 0.8,
                  backgroundColor: 'white',
                  flex: 1,
                  width: '100%',
                  height: '100%',
                }}></View>
              <Text
                style={{
                  position: 'absolute',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                Lele
              </Text>
            </ImageBackground>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          style={{height: 200, width: '48%'}}
          onPress={() => navi.navigate('Premium', {type: 'chicken'})}>
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
              source={assets.chicken}>
              <View
                style={{
                  opacity: 0.8,
                  backgroundColor: 'white',
                  flex: 1,
                  width: '100%',
                  height: '100%',
                }}></View>
              <Text
                style={{
                  position: 'absolute',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                Ayam
              </Text>
            </ImageBackground>
          </Card>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
