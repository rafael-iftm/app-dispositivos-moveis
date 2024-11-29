import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
import TaskForm from './components/TaskForm';
import TaskListItem from './components/TaskListItem';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  const addOrEditTask = (task) => {
    setTasks((prev) => {
      const taskExists = prev.some((t) => t.name === task.name);
      if (editingTask) {
        return prev.map((t) => (t.name === editingTask.name ? task : t));
      } else if (!taskExists) {
        return [...prev, task];
      } else {
        alert("Tarefa com o mesmo nome já existe!");
        return prev;
      }
    });
    setEditingTask(null);
  };

  const deleteTask = (taskName) => {
    setTasks((prev) => prev.filter((task) => task.name !== taskName));
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const getSortedTasks = () => {
    return [...tasks].sort((a, b) => {
      const priorities = { Alta: 3, Média: 2, Baixa: 1 };
      return sortOrder === "desc"
        ? priorities[b.priority] - priorities[a.priority]
        : priorities[a.priority] - priorities[b.priority];
    });
  };

  return (
    <View style={styles.container}>
      <TaskForm
        onSubmit={addOrEditTask}
        taskToEdit={editingTask}
        onCancel={() => setEditingTask(null)}
      />
      <Pressable onPress={toggleSortOrder} style={styles.sortButton}>
        <Text style={styles.sortButtonText}>
          Ordenar ({sortOrder === "desc" ? "Maior → Menor" : "Menor → Maior"})
        </Text>
      </Pressable>
      <FlatList
        data={getSortedTasks()}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TaskListItem
            task={item}
            onDelete={deleteTask}
            onEdit={setEditingTask}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  sortButton: { padding: 10, backgroundColor: "#007BFF", marginBottom: 10 },
  sortButtonText: { color: "#fff", textAlign: "center" },
});
