import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const TaskForm = ({ onSubmit, taskToEdit, onCancel }) => {
  const [name, setName] = useState(taskToEdit?.name || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [priority, setPriority] = useState(taskToEdit?.priority || 'Média');

  const handleSubmit = () => {
    if (!name) return;
    onSubmit({ name, description, priority });
    setName('');
    setDescription('');
    setPriority('Média');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome da tarefa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.priorityContainer}>
        {['Alta', 'Média', 'Baixa'].map((level) => (
          <Pressable
            key={level}
            style={[
              styles.priorityButton,
              priority === level && styles.selectedButton,
            ]}
            onPress={() => setPriority(level)}
          >
            <Text>{level}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Salvar</Text>
      </Pressable>
      {onCancel && (
        <Pressable style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  priorityContainer: { flexDirection: 'row', marginBottom: 10 },
  priorityButton: { padding: 10, borderWidth: 1, marginHorizontal: 5 },
  selectedButton: { backgroundColor: '#ccc' },
  submitButton: { backgroundColor: '#28a745', padding: 10, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { backgroundColor: '#dc3545', padding: 10, alignItems: 'center', marginTop: 10 },
  cancelText: { color: '#fff', fontWeight: 'bold' },
});

export default TaskForm;
