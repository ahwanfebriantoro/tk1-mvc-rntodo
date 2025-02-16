import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, TouchableHighlight, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import StateController from '../../../controllers/StateController';

export default function StateList() {
  const [data, setData] = useState<any[]>([]);
  const stateController = new StateController();
  const navi = useNavigation();

  async function getData() {
    const data = await stateController.getStateData();
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const renderItem = useCallback(({item}) => {
    return (
      <TouchableHighlight
        style={{margin: 5, borderRadius: 13}}
        onPress={() => navi.navigate('Map', {selectedState: item.state})}>
        <Card contentStyle={{flexDirection: 'row'}}>
          <View style={{minHeight: 80}}>
            <Image
              source={{
                uri: item?.flagUrl,
              }}
              style={{
                width: 80,
                height: 100,
                objectFit: 'cover',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
          </View>
          <View style={{padding: 10, justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.state}</Text>
            <Text>Population: &nbsp;{item.population}</Text>
          </View>
        </Card>
      </TouchableHighlight>
    );
  }, []);
  return (
    <View style={{padding: 10, alignItems: 'center'}}>
      <FlatList
        style={{height: '100%', width: '100%'}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.stateId}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
        }}>
        {__DEV__ && (
          <Button
            mode="elevated"
            onPress={() => stateController.fetchAndSaveStateData()}
            contentStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}>
            Refresh Data
          </Button>
        )}
      </View>
    </View>
  );
}
