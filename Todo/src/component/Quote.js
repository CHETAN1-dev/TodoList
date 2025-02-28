import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetRandomQuoteQuery } from '../redux/api/quoteApi';

const Quote = () => {
  const { data: quote, isLoading, error } = useGetRandomQuoteQuery();

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.quoteText}>{quote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'black',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
});

export default Quote;
