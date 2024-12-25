import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';

const App = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'João',
      phone: '(11) 1234-5678',
      group: 'Família',
      groupImage: require('./assets/family.png'),
    },
    {
      id: 2,
      name: 'Maria',
      phone: '(11) 2345-6789',
      group: 'Amigos',
      groupImage: require('./assets/friends.png'),
    },
    {
      id: 3,
      name: 'José',
      phone: '(11) 3456-7890',
      group: 'Trabalho',
      groupImage: require('./assets/work.png'),
    },
  ]);

  const [editingContact, setEditingContact] = useState(null);

  const handleAddContact = (contact) => {
    const newContact = {
      ...contact,
      id: contacts.length + 1,
      groupImage:
        contact.group === 'Família'
          ? require('./assets/family.png')
          : contact.group === 'Amigos'
          ? require('./assets/friends.png')
          : require('./assets/work.png'),
    };
    setContacts([...contacts, newContact]);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleEditContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setEditingContact(null);
  };

  return (
    <View style={styles.container}>
      {editingContact ? (
        <ContactForm
          initialData={editingContact}
          onSubmit={handleEditContact}
        />
      ) : (
        <ContactForm onSubmit={handleAddContact} />
      )}
      <ContactList
        contacts={contacts}
        onDelete={handleDeleteContact}
        onEdit={setEditingContact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default App;