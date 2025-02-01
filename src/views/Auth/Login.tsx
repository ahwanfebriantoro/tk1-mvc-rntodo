import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {ImageBackground, View} from 'react-native';
import {Text} from 'react-native-paper';
import {assets} from '../../assets';
import { useAuthStore } from '../../db/authStore';

export default function Login() {
  const {signInWithGoogle, loadingButton} = useAuthStore();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground
        resizeMethod="auto"
        resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          justifyContent: 'center',
          opacity: 0.3,
          alignItems: 'center',
        }}
        source={assets.ccc}></ImageBackground>
      <View
        style={{
          backgroundColor: 'white',
          gap: 20,
          padding: 20,
          borderRadius: 10,
        }}>
        <View>
          <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>
            You shall not pass
          </Text>
          <Text style={{textAlign: 'center'}}>Proceed with Google SignIn</Text>
        </View>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
          disabled={loadingButton}
        />
      </View>
    </View>
  );
}
