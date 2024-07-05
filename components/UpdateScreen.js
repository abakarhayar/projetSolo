import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function UpdateScreen({ route, navigation }) {
  const { bookId } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/books/${bookId}`);
      const data = await response.json();
      setTitle(data.title);
      setDescription(data.description);
      setYear(data.year);
      setAuthor(data.author);
      setCategory(data.category);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleSubmit = async () => {
    const updatedBook = {
      title: title,
      description: description,
      year: year,
      author: author,
      category: category,
    };

    try {
      await fetch(`http://localhost:7000/api/books/${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <View>
      <Text>Modifier le livre</Text>

      <Text>Titre</Text>
      <TextInput
        style={styles.textInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Titre du livre"
      />

      <Text>Description</Text>
      <TextInput
        style={styles.textInput}
        value={description}
        onChangeText={setDescription}
        multiline={true}
        placeholder="Description du livre"
      />

      <Text>Année</Text>
      <TextInput
        style={styles.textInput}
        value={year}
        onChangeText={setYear}
        placeholder="Année"
        keyboardType="numeric"
      />

      <Text>Auteur</Text>
      <TextInput
        style={styles.textInput}
        value={author}
        onChangeText={setAuthor}
        placeholder="Auteur"
      />

      <Text>Catégorie</Text>
      <TextInput
        style={styles.textInput}
        value={category}
        onChangeText={setCategory}
        placeholder="Catégorie"
      />
      <Button title="Modifier le livre" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10, // Ajout de l'espace entre les champs
  },
});
