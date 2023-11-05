import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../contants/colors';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {object} from 'yup';
import {setTaskID, setTasks} from '../redux/action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Completed({navigation}) {
  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const completedTask=tasks.filter(task => task.Completed === true);

  console.log('task', tasks);
  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    AsyncStorage.getItem('Tasks')
      .then(tasks => {
        const parsedTask = JSON.parse(tasks);
        if (parsedTask && typeof parsedTask === 'object') {
          dispatch(setTasks(parsedTask));
        }
      })
      .catch(err => console.log(err));
  };

  const deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
        Alert.alert(('Success', 'Task Deleted'));
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={'circle'} size={20} color={'green'} />
        <Text>Completed ({completedTask.length})</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={completedTask}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('Task');
            }}>
            <View style={styles.itemContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>{item.Title}</Text>
                <Text style={styles.desc}>{item.Desc}</Text>
                {item.Subtasks && item.Subtasks.length > 0 && (
                  <Text style={styles.desc}>
                    Subtasks: {item.Subtasks.length}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  deleteTask(item.ID);
                }}>
                <Icon name={'delete'} color={colors.redColor} size={30} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: colors.accentColor,
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    color: colors.whiteColor,
  },
  desc: {
    marginVertical: 5,
    fontSize: 15,
    color: colors.offWhite,
  },
});
