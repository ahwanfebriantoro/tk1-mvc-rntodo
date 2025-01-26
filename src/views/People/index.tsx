import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, FlatList, Image} from 'react-native';
import {Card, Text, TouchableRipple} from 'react-native-paper';

export default function RandomPeople() {
  const [data, setData] = useState();
  const navi = useNavigation();

  const getPeopleData = async () => {
    const data = await fetch('https://randomuser.me/api/?results=10&gender=male');
    const json = await data.json();
    console.log(JSON.stringify(json.results, null, 2));
    setData(json.results);
    return;
  };

  useEffect(() => {
    getPeopleData();
  }, []);
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return (
            <TouchableRipple
              onPress={() => {
                navi.navigate('DetailPerson', {data: item});
              }}>
              <Card style={{margin: 10}}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Image
                    source={{uri: item?.picture?.medium}}
                    style={{
                      flex: 1,
                      maxWidth: 100,
                      height: '100%',
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 12,
                    }}
                  />
                  <View style={{padding: 10, flex: 1}}>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                      {item?.name?.first} {item?.name?.last}
                    </Text>
                    <Text>Username</Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {item?.login?.username}
                    </Text>
                    <Text>Password</Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {item?.login?.password}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableRipple>
          );
        }}
      />
    </View>
  );
}
