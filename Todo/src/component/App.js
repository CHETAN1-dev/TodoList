import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import {
  useTasks,
  useAddTask,
  useUpdateTask,
  useDeleteTask,
} from '../redux/api/taskApi';
import TaskForm from './Taskform';
import TaskCount from './Taskcount';
import TaskItem from './Taskitem';
import { queryClient } from '@tanstack/react-query';
const App = () => {
  const {data: tasks = [], isLoading} = useTasks();
  const addTaskMutation = useAddTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const [taskText, setTaskText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState('');

  const onAddTask = async () => {
    if (!taskText.trim()) {
      setError('Task cannot be empty');
      return;
    }

    if (editingTaskId) {
       updateTaskMutation.mutate(
        {
          id: editingTaskId,
          text: taskText,
          priority: selectedPriority,
        },
        {
          onSuccess: () => {
            clearForm();
          },
        },
      );
    } else {
      // Add New Task
      addTaskMutation.mutate(
        {
          id: Date.now().toString(),
          text: taskText,
          completed: false,
          priority: selectedPriority,
        },
        {
          onSuccess: () => {
            clearForm();
          },
        },
      );
    }
  };

  // Handle Task Edit
  const onEditTask = id => {
    const task = tasks.find(task => task.id === id);
    setTaskText(task.text);
    setSelectedPriority(task.priority);
    setEditingTaskId(id);
  };

  // Handle Task Delete
  const onDeleteTask = id => {
    deleteTaskMutation.mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData(['tasks'], old =>
          old.filter(task => task.id !== id),
        );
      },
    });
  };
  const clearForm = () => {
    setTaskText('');
    setSelectedPriority('Medium');
    setEditingTaskId(null);
    setError('');
  };

    if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TaskForm
        taskText={taskText}
        setTaskText={setTaskText}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        onAddTask={onAddTask}
        editingTaskId={editingTaskId}
        error={error}
      />
      <TaskCount taskCount={tasks.length} />

       <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskItem
            task={item}
            onToggleCompletion={() =>
              updateTaskMutation.mutate({
                id: item.id,
                completed: !item.completed,
              })
            }
            onDeleteTask={() => onDeleteTask(item.id)}
            onEditTask={() => onEditTask(item.id)}
          />
        )}
        style={{marginTop: 20}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f0f0f0'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
