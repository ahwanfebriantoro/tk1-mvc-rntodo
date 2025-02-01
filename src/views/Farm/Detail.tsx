import {useNavigation} from '@react-navigation/native';
import {Image, View, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';

export const getPrice = (age: number) =>
  Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format((age < 1 ? 1 : age) * 10 ** 7);

export default function Detail({route}) {
  const [data, setData] = useState<any>();

  const navi = useNavigation();

  const age = data?.birth_date
    ? dayjs(Date.now()).diff(data?.birth_date, 'years')
    : 0;

  const deleteDocument = async (id: string) => {
    try {
      await firestore().collection('livestock').doc(id).delete();
      console.log('Document deleted!');
      navi.navigate('AnimalList', {type: 'Sapi'});
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const feedTernak = async (id: string) => {
    try {
      const isNewDay = data?.last_fed ? dayjs().diff(data?.last_fed, 'day') : 0;
      await firestore()
        .collection('livestock')
        .doc(id)
        .update({
          last_fed: new Date(),
          today_feed_counter: (isNewDay ? 0 : data?.today_feed_counter) + 1,
        })
        .catch(e => console.log(e, 'ee'));
      console.log('Document updated!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  useEffect(() => {
    const geta = () => {
      const a = firestore()
        .collection('livestock')
        .doc(route.params?.data?.id)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.data();
          setData({...data, id: querySnapshot.id});
        })
        .catch(e => console.log(e));
      console.log(a);
    };
    geta();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      <Image
        source={{
          uri: 'https://media.istockphoto.com/id/106531788/id/foto/pandangan-samping-sapi-holstein-5-tahun-berdiri.jpg?s=612x612&w=0&k=20&c=Tc16zdNrmnRg9ZkgruBrSmfBjSMjeW83drG38jEpkps=',
        }}
        style={{width: '100%', height: 300}}
      />
      <View style={{padding: 20, gap: 5}}>
        <View>
          <Text>Nama</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {data?.name || ''}
          </Text>
        </View>
        <View>
          <Text>Umur</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {age}&nbsp;Tahun
          </Text>
        </View>
        <View>
          <Text>Status</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sehat</Text>
        </View>
        <View>
          <Text>Makan hari ini</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {data?.today_feed_counter || '0'} Kali
          </Text>
        </View>
        <View>
          <Text>Terakhir makan</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {data?.last_fed
              ? dayjs(data?.last_fed?.seconds * 1000).format(
                  'DD MMMM YYYY HH:mm',
                )
              : '-'}
          </Text>
        </View>
        <View>
          <Text>Estimasi Harga</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{getPrice(age)}</Text>
        </View>
      </View>
      <View style={{gap: 10, padding: 20}}>
        <Button
          mode="elevated"
          onPress={() => feedTernak(route?.params?.data?.id)}
          contentStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}>
          Beri Makan
        </Button>
        <Button
          mode="elevated"
          onPress={() => navi.navigate('EditData', {type: 'Sapi', data: data})}
          contentStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}>
          Edit
        </Button>
        <Button
          mode="elevated"
          onPress={() => deleteDocument(route?.params?.data?.id)}
          contentStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}>
          Hapus
        </Button>
      </View>
    </ScrollView>
  );
}
