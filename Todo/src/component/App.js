// src/App.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../redux/api/taskApi';
import TaskForm from './Taskform';
import TaskList from './Tasklist';
import TaskCount from './Taskcount';
import Quote from './Quote';

const App = () => {
  const { data: tasks = [], refetch } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [taskText, setTaskText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    if (editingTaskId) {
      const taskToEdit = tasks.find(task => task.id === editingTaskId);
      if (taskToEdit) {
        setTaskText(taskToEdit.text);
        setSelectedPriority(taskToEdit.priority);
      }
    }
  }, [editingTaskId, tasks]);

  const onAddTask = async () => {
    if (taskText.trim()) {
      if (editingTaskId) {
        await updateTask({ id: editingTaskId, text: taskText, priority: selectedPriority });
      } else {
        await addTask({ id: Date.now().toString(), text: taskText, completed: false, priority: selectedPriority });
      }
      setTaskText('');
      setSelectedPriority('Medium');
      setEditingTaskId(null);
      refetch();
    } else {
      alert('Task cannot be empty');
    }
  };

  const onEditTask = (id) => setEditingTaskId(id);
  const onDeleteTask = async (id) => { await deleteTask(id); refetch(); };

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
      />
      <TaskCount taskCount={tasks.length} />
      <TaskList tasks={tasks} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
      <Quote />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});

export default App;
