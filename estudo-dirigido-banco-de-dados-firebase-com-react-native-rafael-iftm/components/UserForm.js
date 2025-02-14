import React, { useState, useEffect } from 'react';
import { TextInput, Button, View } from 'react-native';
import styles from '../styles/styles';

export default function UserForm({ saveData, editingUser }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    if (editingUser) {
      setNome(editingUser.fields.nome.stringValue);
      setEmail(editingUser.fields.email.stringValue);
      setEndereco(editingUser.fields.endereco.stringValue);
      setTelefone(editingUser.fields.telefone.stringValue);
      setObservacoes(editingUser.fields.observacoes.stringValue);
    }
  }, [editingUser]);

  return (
    <View>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TextInput style={styles.input} placeholder="Observações" value={observacoes} onChangeText={setObservacoes} />
      <Button title={editingUser ? 'Atualizar Usuário' : 'Salvar Usuário'} onPress={() => saveData({ nome, email, endereco, telefone, observacoes })} />
    </View>
  );
}