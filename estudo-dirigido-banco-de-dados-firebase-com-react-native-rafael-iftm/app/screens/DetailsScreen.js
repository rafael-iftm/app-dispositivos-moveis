import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/styles';

export default function DetailsScreen({ route }) {
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
