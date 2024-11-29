import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const addOrEditTask = (task) => {
    setTasks((prev) => {
      const updated = editingTask
        ? prev.map((t) => (t.name === editingTask.name ? task : t))
        : [...prev, task];
      return updated;
    });
    setEditingTask(null);
  };

  const deleteTask = (taskName) => {
    setTasks((prev) => prev.filter((t) => t.name !== taskName));
  };

  return (
    <View style={styles.container}>
      <TaskForm
        onSubmit={addOrEditTask}
        taskToEdit={editingTask}
        onCancel={() => setEditingTask(null)}
      />
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={setEditingTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
