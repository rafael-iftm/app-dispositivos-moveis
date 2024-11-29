import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onEdit, sortByPriority }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TaskItem task={item} onDelete={onDelete} onEdit={onEdit} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default TaskList;
