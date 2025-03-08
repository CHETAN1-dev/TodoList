// src/Taskcount.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTasks} from '../redux/api/taskApi';

const TaskCount = () => {
  const {data: tasks = []} = useTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Total Tasks: {tasks.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskCount;
