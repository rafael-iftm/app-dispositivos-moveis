import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <View style={[styles.container, styles[`priority_${task.priority}`]]}>
      <Text style={styles.name}>{task.name}</Text>
      <Text>{task.description}</Text>
      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={() => onEdit(task)}>
          <Text>Editar</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => onDelete(task.name)}>
          <Text>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, borderWidth: 1, marginBottom: 10 },
  priority_Alta: { borderColor: 'red' },
  priority_Média: { borderColor: 'yellow' },
  priority_Baixa: { borderColor: 'green' },
  name: { fontWeight: 'bold' },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  button: { padding: 5, borderWidth: 1 },
});

export default TaskItem;
