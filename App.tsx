import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface TASKS {
  id: string;
  name: string;
}

const App = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<TASKS[]>([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, {id: Date.now().toString(), name: task}]);
      setTask('');
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(item => item.id !== id));
  };

  const renderTask = (item: TASKS) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={task}
        onChangeText={text => setTask(text)}
      />
      <Pressable onPress={handleAddTask} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      <FlatList
        data={tasks}
        renderItem={({item}) => renderTask(item)}
        keyExtractor={item => item.id}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  taskList: {
    marginTop: 20,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
  },
  taskItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 18,
    color: '#000',
  },
  deleteButton: {
    color: '#000',
    backgroundColor: 'red',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default App;
