import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const firestoreURL = 'https://firestore.googleapis.com/v1/projects/app-trab-final-51cbf/databases/(default)/documents/usuarios'

  const fetchData = async () => {
    try {
      const response = await fetch(firestoreURL);
      const data = await response.json();

      if (data.documents) {
        const usuariosFormatados = data.documents.map((doc) => {
          const fields = doc.fields;
          return {
            id: doc.name.split('/').pop(),
            nome: fields.nome.stringValue,
            email: fields.email.stringValue,
          };
        });
        setUsuarios(usuariosFormatados);
      } else {
        setUsuarios([]);
      }
    } catch (err) {
      setError('Erro ao buscar dados do servidor.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveData = async () => {
    try {
      const newData = {
        fields: {
          nome: { stringValue: nome },
          email: { stringValue: email },
        },
      };
      const response = await fetch(firestoreURL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        }
      );

      if (response.ok) {
        setMessage('Usuário salvo com sucesso!');
        setNome('');
        setEmail('');
      } else {
        setMessage('Erro ao salvar usuário.');
      }
    } catch (err) {
      setMessage('Erro ao salvar usuário.');
      console.error(err);
    }
    fetchData()
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${firestoreURL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Usuário excluído com sucesso!');
        fetchData();
      } else {
        setMessage('Erro ao excluir usuário.');
      }
    } catch (err) {
      setMessage('Erro ao excluir usuário.');
      console.error(err);
    }
  };

  const editUser = async () => {
    try {
      const updatedData = {
        fields: {
          nome: { stringValue: nome },
          email: { stringValue: email },
        },
      };
      const response = await fetch(`${firestoreURL}/${editingUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        setMessage('Usuário atualizado com sucesso!');
        setEditingUser(null);
        setNome('');
        setEmail('');
        fetchData();
      } else {
        setMessage('Erro ao atualizar usuário.');
      }
    } catch (err) {
      setMessage('Erro ao atualizar usuário.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Adicionar Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Salvar" onPress={saveData} />
      {message && <Text style={styles.message}>{message}</Text>}

      {editingUser && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Button title="Salvar Alterações" onPress={editUser} />
        </View>
      )}

      <Text style={styles.title}>Lista de Usuários</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {usuarios.length > 0 ? (
        usuarios.map((usuario) => (
            <View key={usuario.id} style={styles.userContainer}>
              <Text>{usuario.nome} - {usuario.email}</Text>
              <Button title="Editar" onPress={() => {
                setEditingUser(usuario);
                setNome(usuario.nome);
                setEmail(usuario.email);
              }} />
            </View>
        ))

      ) : (
        <Text>Nenhum usuário encontrado.</Text>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    flex: 1,
    padding: 16,
  },

  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  error: { color: 'red', marginBottom: 16 },
  input:{ borderWidth:1, padding:4, marginBottom:8, borderRadius:4},
  message:{ color:'red', fontSize: 8, textAlign:'center',  padding:4, marginBottom:8}
});
