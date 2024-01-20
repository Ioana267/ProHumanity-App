import React from 'react';

import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

const ArticleDetail = ({ route }) => {
  const { article } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.bigDiv}>
        <Image style={styles.articleImage} source={require(article.image)} />

        <Text style={styles.bigText}>{article.title}</Text>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigDiv: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#E0F6E1',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleDiv: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    // fontFamily: 'monteserrat',
    backgroundColor: '#c4edc4',
    width: 500,
  },
});

export default ArticleDetail;