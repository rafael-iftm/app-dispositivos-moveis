import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ContactForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [group, setGroup] = useState(initialData?.group || 'Família');

  const handleSubmit = () => {
    onSubmit({ name, phone, group });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Telefone"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <View style={styles.groupContainer}>
        <Text style={styles.label}>Grupo:</Text>
        <TouchableOpacity onPress={() => setGroup('Família')} style={group === 'Família' ? styles.selectedGroup : styles.group}>
          <Text>Família</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGroup('Amigos')} style={group === 'Amigos' ? styles.selectedGroup : styles.group}>
          <Text>Amigos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGroup('Trabalho')} style={group === 'Trabalho' ? styles.selectedGroup : styles.group}>
          <Text>Trabalho</Text>
        </TouchableOpacity>
      </View>
      <Button title="Adicionar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginRight: 10,
  },
  group: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedGroup: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    backgroundColor: '#E6F0FF',
    marginHorizontal: 5,
  },
});

export default ContactForm;