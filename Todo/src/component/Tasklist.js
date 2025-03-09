// src/Tasklist.js
import React from 'react';
import { FlatList } from 'react-native';
import { useGetTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation } from '../redux/api/taskApi';
import TaskItem from '../component/Taskitem';

const TaskList = ({onEditTask}) => {
  const { data: tasks = [], refetch } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const onToggleCompletion = async (id, completed) => {
    await updateTask({ id, completed: !completed });
    refetch();
  };

  const onDeleteTask = async (id) => {
    await deleteTask(id);
    refetch();
  };

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          onToggleCompletion={() => onToggleCompletion(item.id, item.completed)}
          onDeleteTask={() => onDeleteTask(item.id)
          }
          onEditTask={() => onEditTask(item.id)}
        />
      )}
      style={{ marginTop: 20 }}
    />
  );
};

export default TaskList;
