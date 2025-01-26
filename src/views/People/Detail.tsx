import {View, ScrollView, Image, StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';

export default function RandomPeople({route}) {
  const data = route?.params?.data;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <View style={{gap: 10}}>
          <Image
            source={{uri: route?.params?.data?.picture?.large}}
            style={{
              width: '100%',
              minHeight: 300,
            }}
          />
          <View
            style={{
              padding: 16,
            }}>
            <Text style={styles.name}>
              {data?.name.title}. {data?.name.first} {data?.name.last}
            </Text>
            <Text style={styles.text}>Gender: {data?.gender}</Text>
            <Text style={styles.text}>Email: {data?.email}</Text>
            <Text style={styles.text}>Username: {data?.login.username}</Text>
            <Text style={styles.text}>Password: {data?.login.password}</Text>
            <Text style={styles.text}>UUID: {data?.login.uuid}</Text>
            <Text style={styles.text}>Salt: {data?.login.salt}</Text>
            <Text style={styles.text}>MD5: {data?.login.md5}</Text>
            <Text style={styles.text}>SHA1: {data?.login.sha1}</Text>
            <Text style={styles.text}>SHA256: {data?.login.sha256}</Text>
            <Text style={styles.text}>Phone: {data?.phone}</Text>
            <Text style={styles.text}>Cell: {data?.cell}</Text>
            <Text style={styles.text}>Nationality: {data?.nat}</Text>
            <Text style={styles.text}>Age: {data?.dob.age}</Text>
            <Text style={styles.text}>
              Date of Birth: {new Date(data?.dob.date).toLocaleDateString()}
            </Text>
            <Text style={styles.text}>
              Registered: {new Date(data?.registered.date).toLocaleDateString()}{' '}
              (Age: {data?.registered.age})
            </Text>
            <Text style={styles.text}>Address:</Text>
            <Text style={styles.text}>
              {data?.location.street.number} {data?.location.street.name},
            </Text>
            <Text style={styles.text}>
              {data?.location.city}, {data?.location.state},{' '}
              {data?.location.country}, {data?.location.postcode}
            </Text>
            <Text style={styles.text}>Coordinates:</Text>
            <Text style={styles.text}>
              Latitude: {data?.location.coordinates.latitude}
            </Text>
            <Text style={styles.text}>
              Longitude: {data?.location.coordinates.longitude}
            </Text>
            <Text style={styles.text}>
              Timezone: {data?.location.timezone.description} (
              {data?.location.timezone.offset})
            </Text>
            <Text style={styles.text}>
              ID: {data?.id.name} {data?.id.value}
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
});
