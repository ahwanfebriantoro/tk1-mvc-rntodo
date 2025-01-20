import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, TouchableHighlight, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import { getPrice } from '../Detail';

export default function AnimalList({route}) {
  const [data, setData] = useState<any[]>([]);
  const navi = useNavigation();

  useEffect(() => {
    const geta = () => {
      const a = firestore()
        .collection('livestock')
        .get()
        .then(querySnapshot => {
          const data: any[] = [];
          querySnapshot.forEach(documentSnapshot => {
            data.push({...documentSnapshot.data(), id: documentSnapshot.id});
          });
          setData(data);
        });
      console.log(a);
    };
    geta();
  }, []);

  const renderItem = useCallback(({item}) => {
    const age = dayjs().diff(item.birth_date, 'years')
    return (
      <TouchableHighlight
        style={{margin: 5, borderRadius: 13}}
        onPress={() =>
          navi.navigate('Detail', {
            type: route?.params?.type,
            id: item.id,
            data: item,
          })
        }>
        <Card contentStyle={{flexDirection: 'row'}}>
          <View style={{minHeight: 80}}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/id/106531788/id/foto/pandangan-samping-sapi-holstein-5-tahun-berdiri.jpg?s=612x612&w=0&k=20&c=Tc16zdNrmnRg9ZkgruBrSmfBjSMjeW83drG38jEpkps=',
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
          <View style={{padding: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name || 'Sapi ' + item.id}</Text>
            <Text>
              Terakhir makan hari ini: {dayjs(item?.last_fed?.seconds * 1000).format('DD MMMM YYYY HH:mm')}
            </Text>
            <Text>Umur: {age} Tahun</Text>
            <Text>Estimasi Harga Jual : {getPrice(age)}</Text>
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
        keyExtractor={item => item.id}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
        }}>
        <Button
          mode="elevated"
          onPress={() => navi.navigate('AddData', {type: 'Sapi'})}
          contentStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}>
          Tambah Data Sapi
        </Button>
      </View>
    </View>
  );
}
