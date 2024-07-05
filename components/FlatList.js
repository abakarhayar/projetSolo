import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function ListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Books</Text>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
