// src/Taskitem.js
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, onToggleCompletion, onDeleteTask }) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity style={styles.taskTextContainer} onPress={onToggleCompletion}>
        <Text style={[styles.taskText, task.completed && styles.taskCompleted]}>
          {task.text}
        </Text>
        <Text style={styles.priorityText}>Priority: {task.priority}</Text>
      </TouchableOpacity>
      <View style={styles.taskActions}>
        <Button title="Delete" color="red" onPress={onDeleteTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTextContainer: { flex: 1 },
  taskText: { fontSize: 18 },
  taskCompleted: { textDecorationLine: 'line-through', color: 'green' },
  priorityText: { fontSize: 14, color: '#888', marginTop: 5 },
  taskActions: { flexDirection: 'row', gap: 10 },
});

export default TaskItem;
