import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

export default function TaskForm({ onSubmit, taskToEdit, onCancel }) {
  const [name, setName] = useState(taskToEdit?.name || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [priority, setPriority] = useState(taskToEdit?.priority || 'Média');

  const handleSubmit = () => {
    if (!name || !description) {
      alert('Preencha todos os campos!');
      return;
    }
    onSubmit({ name, description, priority });
    setName('');
    setDescription('');
    setPriority('Média');
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Nome da Tarefa"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <View style={styles.radioGroup}>
        {['Alta', 'Média', 'Baixa'].map((level) => (
          <Pressable key={level} onPress={() => setPriority(level)} style={styles.radio}>
            <Text style={[styles.radioText, priority === level && styles.selectedRadio]}>
              {level}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>
          {taskToEdit ? 'Salvar Alterações' : 'Adicionar Tarefa'}
        </Text>
      </Pressable>
      {taskToEdit && (
        <Pressable onPress={onCancel} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  radioGroup: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  radio: { padding: 10 },
  radioText: { fontSize: 16 },
  selectedRadio: { fontWeight: 'bold', textDecorationLine: 'underline' },
  button: { backgroundColor: 'blue', padding: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },
  cancelButton: { backgroundColor: 'gray' },
});
