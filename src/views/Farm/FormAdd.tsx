import {ScrollView, View} from 'react-native';
import {
  Button,
  Modal,
  Portal,
  RadioButton,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {Controller, useForm} from 'react-hook-form';
import {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';

export const retype = {
  Sapi: {type: 'cow'},
  Ayam: {type: 'chicken'},
  Lele: {type: 'catfish'},
  Kambing: {type: 'sheep'},
};
export default function FormAdd({route}: any) {
  const [modalDateOpen, setModalDateOpen] = useState(false);
  const navi = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      birth_date: new Date(),
      status: 'fit',
      // @ts-ignore
      type: retype?.[route?.params?.type]?.type,
    },
  });

  const createDocument = async (values: any) => {
    try {
      await firestore().collection('livestock').add({
        name: values.name,
        birth_date: values.birth_date,
        status: values.status || 'fit',
        last_fed: null,
        today_feed_counter: 0,
        // @ts-ignore
        type: retype?.[route?.params?.type]?.type,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Berhasil membuat data baru!');
      navi.navigate('AnimalList', {type: route?.params?.type});
    } catch (error) {
      console.error('Error menambah data:', error);
    }
  };

  const onConfirmSingle = useCallback(
    (params: any) => {
      setModalDateOpen(false);
      setValue('birth_date', params.date as never);
    },
    [setModalDateOpen, setValue],
  );

  return (
    <ScrollView style={{gap: 20, padding: 20}}>
      <View style={{gap: 20}}>
        <TextInput
          mode="flat"
          label={'Nama'}
          data-name="name"
          onChangeText={v => setValue('name', v)}
        />
        <Controller
          name="status"
          control={control}
          defaultValue={'fit'}
          render={({field: {value, onChange}}) => (
            <View>
              <Text>Status</Text>
              <TouchableRipple onPress={() => onChange('fit')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    value={'fit'}
                    status={value === 'fit' ? 'checked' : 'unchecked'}
                    onPress={() => onChange('fit')}
                  />
                  <Text>Sehat</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => onChange('sick')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    value={'sick'}
                    status={value === 'sick' ? 'checked' : 'unchecked'}
                    onPress={() => onChange('sick')}
                  />
                  <Text>Sakit</Text>
                </View>
              </TouchableRipple>
            </View>
          )}
        />
        <Controller
          name="birth_date"
          control={control}
          render={({field: {value, onChange}}) => (
            <View>
              <TextInput
                mode="flat"
                value={`${dayjs(value).format('DD MMMM YYYY')} / ${dayjs().diff(
                  value,
                  'years',
                )} Tahun`}
                label={'Tanggal Lahir/Perkiraan tanggal lahir'}
                onPress={() => setModalDateOpen(true)}
              />
              <Portal>
                <Modal
                  visible={modalDateOpen}
                  style={{backgroundColor: 'white'}}
                  dismissableBackButton
                  dismissable={true}
                  onDismiss={() => setModalDateOpen(false)}>
                  <DateTimePicker
                    mode="single"
                    timePicker
                    date={value}
                    onChange={params =>
                      setValue('birth_date', params?.date as never)
                    }
                  />
                  <Button onPress={() => setModalDateOpen(false)}>OK</Button>
                </Modal>
              </Portal>
            </View>
          )}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Button
          disabled={!isEmpty(errors)}
          mode="elevated"
          onPress={handleSubmit(createDocument)}
          contentStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}>
          Tambah Data Sapi
        </Button>
      </View>
    </ScrollView>
  );
}
