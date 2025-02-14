import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function UserItem({ item, onEdit, onDelete, onDetails }) {
  return (
    <View style={styles.userContainer}>
      <View>
        <Text style={styles.userName}>{item.fields.nome.stringValue}</Text>
        <Text style={styles.userEmail}>{item.fields.email.stringValue}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => onEdit(item)}>
            <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(item.name.split('/').pop())}>
            <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.detailsButton]} onPress={onDetails}>
            <Text style={styles.buttonText}>Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}