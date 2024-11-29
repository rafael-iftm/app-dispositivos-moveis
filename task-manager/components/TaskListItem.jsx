import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function TaskListItem({ task, onDelete, onEdit }) {
  const priorityStyles = {
    Alta: styles.highPriority,
    Média: styles.mediumPriority,
    Baixa: styles.lowPriority,
  };

  return (
    <View style={styles.item}>
      <View style={[styles.priorityIndicator, priorityStyles[task.priority]]} />
      <View style={styles.details}>
        <Text style={styles.name}>{task.name}</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>
      <Pressable onPress={() => onEdit(task)}>
        <Text style={styles.edit}>Editar</Text>
      </Pressable>
      <Pressable onPress={() => onDelete(task.name)}>
        <Text style={styles.delete}>Excluir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  priorityIndicator: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  highPriority: { backgroundColor: 'red' },
  mediumPriority: { backgroundColor: 'orange' },
  lowPriority: { backgroundColor: 'green' },
  details: { flex: 1 },
  name: { fontWeight: 'bold' },
  description: { color: 'gray' },
  edit: { color: 'blue', marginHorizontal: 10 },
  delete: { color: 'red' },
});
