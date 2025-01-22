import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const firestoreURL = 'https://firestore.googleapis.com/v1/projects/app-trab-final-51cbf/databases/(default)/documents/usuarios';
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [observacoes, setObservacoes] = useState('');
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

  const saveData = async () => {
    try {
      const newData = {
        fields: {
          nome: { stringValue: nome },
          email: { stringValue: email },
          endereco: { stringValue: endereco },
          telefone: { stringValue: telefone },
          observacoes: { stringValue: observacoes },
        },
      };
  
      const method = editingUser ? 'PATCH' : 'POST';
      const endpoint = editingUser
        ? `${firestoreURL}/${editingUser.name.split('/').pop()}`
        : firestoreURL;
  
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
  
      if (response.ok) {
        Alert.alert('Sucesso', editingUser ? 'Usuário atualizado!' : 'Usuário salvo!');
        fetchData();
        resetForm();
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
      const response = await fetch(`${firestoreURL}/${id}`, {
        method: 'DELETE',
      });
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

  const resetForm = () => {
    setNome('');
    setEmail('');
    setEndereco('');
    setTelefone('');
    setObservacoes('');
    setEditingUser(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Usuários</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
      />
      <Button
        title={editingUser ? 'Atualizar Usuário' : 'Salvar Usuário'}
        onPress={saveData}
        color="#4CAF50"
      />

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <View>
              <Text style={styles.userName}>{item.fields.nome.stringValue}</Text>
              <Text style={styles.userEmail}>{item.fields.email.stringValue}</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => {
                  setEditingUser(item);
                  setNome(item.fields.nome.stringValue);
                  setEmail(item.fields.email.stringValue);
                  setEndereco(item.fields.endereco.stringValue);
                  setTelefone(item.fields.telefone.stringValue);
                  setObservacoes(item.fields.observacoes.stringValue);
                }}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => deleteUser(item.name.split('/').pop())}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.detailsButton]}
                onPress={() => navigation.navigate('Details', { usuario: item.fields })}
              >
                <Text style={styles.buttonText}>Detalhes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { usuario } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Usuário</Text>
      <Text>Nome: {usuario.nome.stringValue}</Text>
      <Text>Email: {usuario.email.stringValue}</Text>
      <Text>Endereço: {usuario.endereco.stringValue}</Text>
      <Text>Telefone: {usuario.telefone.stringValue}</Text>
      <Text>Observações: {usuario.observacoes.stringValue}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    elevation: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  detailsButton: {
    backgroundColor: '#FFC107',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
