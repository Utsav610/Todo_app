import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Picker,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../components/customButton';
import colors from '../contants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {setTaskID, setTasks} from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Task({navigation}) {
  const {tasks, taskID} = useSelector(state => state.taskReducer);

  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [status, setStatus] = useState('TODO');
  const [subtasks, setSubtasks] = useState(['']);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    getTask();
  }, []);

  const addSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const removeSubtask = index => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
  };

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    console.log('task',Task);
    if (Task) {
      setTitle(Task.Title);
      setDes(Task.Desc);
      setSubtasks(Task.Subtasks || []);
      setCompleted(Task.Completed)
    }
  };

  const setTask = () => {
    if (title.length === 0) {
      Alert.alert('Warning', 'Please enter Title');
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: des,
          Subtasks: subtasks,
          Completed:completed
        };
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasks, Task];
        }

        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Task added Successfully');
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log('err', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <Text style={{marginVertical: 5}}>Title</Text>
          <TextInput
            value={title}
            style={styles.input}
            placeholder="eg. Task a Coffee"
            onChangeText={value => {
              setTitle(value);
            }}
          />
          <Text style={{marginVertical: 5}}>Description</Text>
          <TextInput
            value={des}
            style={[styles.input, styles.multiLineInput]}
            placeholder="eg. Task a Coffee"
            multiline
            onChangeText={value => {
              setDes(value);
            }}
          />
          <View>
            <Text style={{marginVertical: 5}}>SubTasks</Text>
            {subtasks.map((subtask, index) => (
              <View key={index} style={styles.subtaskContainer}>
                <TextInput
                  value={subtask}
                  style={styles.subtaskInput}
                  placeholder="Enter Subtask"
                  onChangeText={value => {
                    const updatedSubtasks = [...subtasks];
                    updatedSubtasks[index] = value;
                    setSubtasks(updatedSubtasks);
                  }}
                />
                <TouchableOpacity onPress={() => removeSubtask(index)}>
                  <Icon name={'delete'} color={colors.redColor} size={25} />
                </TouchableOpacity>
              </View>
            ))}

            <CustomButton
              title="Add Subtask"
              style={{width: '100%'}}
              color={colors.primaryColor}
              onPress={addSubtask}
            />
          </View>
          <TouchableOpacity
          style={{flexDirection:'row' , alignItems:'center' , alignSelf:'center'}}
            onPress={() => {
              setCompleted(!completed);
              
            }}>
            <Icon
              name={completed ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={25}
              color={colors.primaryColor}
            />
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          title={taskID ? 'Update Task' : 'Create a New Task'} // Conditionally set the button text
          color={colors.primaryColor}
          style={{ width: '100%' }}
          onPress={setTask}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    marginHorizontal: 12,
  },
  input: {
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: colors.whiteColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  multiLineInput: {
    minHeight: 100,
  },
  subtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtaskInput: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: colors.offGrayColor,
    backgroundColor: colors.whiteColor,
    borderRadius: 5,
    padding: 10,
  },
  deleteText: {
    color: 'red',
    marginLeft: 10,
  },
});
