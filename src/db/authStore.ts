import {create} from 'zustand';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  loadingButton: false,

  setLoading: (loading: boolean) => set({loading}),

  checkSignInStatus: async () => {
    set({loading: true});
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      await get().handleUserLogin(userInfo?.user);
    } catch (error) {
      console.error('Error checking sign-in status:', error);
      set({loading: false});
    }
  },

  handleUserLogin: async (googleUser: any) => {
    set({loading: true});
    const {id, email, name} = googleUser;

    try {
      const userRef = firestore().collection('users').doc(email);
      const doc = await userRef.get();

      if (doc.exists) {
        await userRef.update({
          isLoggedIn: true,
          lastLogin: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        await userRef.set({
          id,
          email,
          name,
          isLoggedIn: true,
          createdAt: firestore.FieldValue.serverTimestamp(),
          lastLogin: firestore.FieldValue.serverTimestamp(),
        });
      }

      set({user: googleUser, loading: false});
    } catch (error) {
      console.error('Firestore Error:', error);
      set({loading: false});
    }
  },

  signInWithGoogle: async () => {
    set({loadingButton: true});
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(
        res?.data?.idToken,
      );
      await auth().signInWithCredential(googleCredential);

      await get().handleUserLogin(res?.data?.user);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in');
      }
    }
    set({loadingButton: false});
  },

  signOut: async () => {
    try {
      const {user} = get();
      if (user) {
        await firestore().collection('users').doc(user.email).update({
          isLoggedIn: false,
          lastLogout: firestore.FieldValue.serverTimestamp(),
        });
      }

      await GoogleSignin.signOut();
      await auth().signOut();
      set({user: null});
    } catch (error) {
      console.error('Sign-out Error:', error);
    }
  },
}));
