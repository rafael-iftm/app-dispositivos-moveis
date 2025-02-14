import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert } from 'react-native';
import UserForm from '../../components/UserForm';
import UserItem from '../../components/UserItem';
import styles from '../../styles/styles';

const firestoreURL = 'https://firestore.googleapis.com/v1/projects/app-trab-final-51cbf/databases/(default)/documents/usuarios';

export default function HomeScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(firestoreURL);
      const data = await response.json();
      setUsuarios(data.documents || []);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveData = async (user) => {
    try {
      const method = editingUser ? 'PATCH' : 'POST';
      const endpoint = editingUser ? `${firestoreURL}/${editingUser.name.split('/').pop()}` : firestoreURL;

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: {
          nome: { stringValue: user.nome },
          email: { stringValue: user.email },
          endereco: { stringValue: user.endereco },
          telefone: { stringValue: user.telefone },
          observacoes: { stringValue: user.observacoes },
        } }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', editingUser ? 'Usuário atualizado!' : 'Usuário salvo!');
        fetchData();
        setEditingUser(null);
      } else {
        Alert.alert('Erro', 'Erro ao salvar usuário.');
      }
    } catch (err) {
      console.error('Erro ao salvar usuário:', err);
      Alert.alert('Erro', 'Erro ao salvar usuário.');
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${firestoreURL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
        fetchData();
      } else {
        Alert.alert('Erro', 'Erro ao excluir usuário.');
      }
    } catch (err) {
      console.error('Erro ao excluir usuário:', err);
      Alert.alert('Erro', 'Erro ao excluir usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <UserForm saveData={saveData} editingUser={editingUser} />
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.name.split('/').pop()}
        renderItem={({ item }) => (
          <UserItem item={item} onEdit={setEditingUser} onDelete={deleteUser} onDetails={() => navigation.navigate('Details', { usuario: item.fields })} />
        )}
      />
    </View>
  );
}
