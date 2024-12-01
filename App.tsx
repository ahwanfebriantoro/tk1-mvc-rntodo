import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '@react-native-material/core';
import CheckBox from 'react-native-check-box';
import Icon from '@react-native-vector-icons/fontawesome6';
import {
  Button,
  Card,
  Modal,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TodoController from './src/controllers/TodoController';
import Todo from './src/models/Todo';

const Item = (props: {onDelete: any; onToggle: any} & Todo) => {
  return (
    <TouchableRipple onPress={() => props.onToggle(props.id)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          flex: 1,
          width: '100%',
        }}>
        <CheckBox
          isChecked={props.completed}
          onClick={() => props.onToggle(props.id)}
        />
        <Text
          style={{
            textDecorationLine: props.completed ? 'line-through' : 'none',
            flex: 1,
            padding: 10,
          }}
          numberOfLines={2}>
          {props?.title || ''}
        </Text>
        <TouchableOpacity onPress={() => props.onDelete(props.id)}>
          <Icon name="delete-left" size={30} color="#900" iconStyle={'solid'} />
        </TouchableOpacity>
      </View>
    </TouchableRipple>
  );
};

function App(): React.JSX.Element {
  const [data, setData] = useState(TodoController.getTodos());
  const [inputTitle, setInputTitle] = useState('');
  const [visible, setIsVisible] = useState(false);

  const addTodo = () => {
    if (inputTitle.trim()) {
      setData(TodoController.addTodo(inputTitle));
      setInputTitle('');
      setIsVisible(false);
    }
  };

  const toggleTodo = (id: string) => {
    setData(TodoController.toggleTodo(id));
  };

  const deleteTodo = (id: string) => {
    setData(TodoController.deleteTodo(id));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', padding: 20}}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <Text style={{fontSize: 20}}>Todo Manager ABC</Text>
        <FlatList
          keyExtractor={item => item.id}
          data={data}
          renderItem={({item}) => (
            <Item {...item} onDelete={deleteTodo} onToggle={toggleTodo} />
          )}
        />
        <Button
          mode="elevated"
          onPress={() => setIsVisible(true)}
          contentStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}>
          Add Task
        </Button>
        <Modal visible={visible} style={{margin: '5%'}}>
          <Card style={{padding: 20}}>
            <Text style={{fontSize: 18, marginBottom: 10}}>
              Create New Task
            </Text>
            <TextInput
              mode="outlined"
              onChangeText={text => setInputTitle(text)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: 10,
              }}>
              <Button onPress={() => setIsVisible(false)}>Cancel</Button>
              <Button onPress={addTodo} mode="contained-tonal">
                Save
              </Button>
            </View>
          </Card>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
