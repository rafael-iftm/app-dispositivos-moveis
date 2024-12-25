import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onDelete, onEdit }) => {
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ContactItem contact={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
};

export default ContactList;