import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TarefasApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Função para buscar as tarefas
  const fetchTasks = async () => {
    const tasksCollection = collection(db, 'tasks');
    const taskSnapshot = await getDocs(tasksCollection);
    const taskList = taskSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTasks(taskList);
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  const addTask = async () => {
    if (task) {
      await addDoc(collection(db, 'tasks'), { name: task });
      setTask('');
      fetchTasks(); 
    }
  };

  const removeTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    fetchTasks(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Adicionar nova tarefa"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
      <ScrollView>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.name}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeTask(item.id)}>
              <Text style={styles.removeButtonText}><FontAwesome name="trash-o" size={24} color="black" /></Text>
            </TouchableOpacity>
          </View>
        )}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 15,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1E90FF',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default TarefasApp;
