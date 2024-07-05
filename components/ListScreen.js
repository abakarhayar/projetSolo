import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function ListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBooks();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <Text style={styles.title}>Titre: {item.title}</Text>
      <Text style={styles.author}>Auteur: {item.author}</Text>
      <Text style={styles.description}>Description: {item.description}</Text>
      <Text style={styles.category}>Année: {item.year}</Text>
      <Text style={styles.category}>Catégorie: {item.category}</Text>
      <Button
        title="Modifier"
        onPress={() => navigation.navigate('update', { bookId: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des livres</Text>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Ajouter un livre"
        onPress={() => navigation.navigate('add')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  category: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
});