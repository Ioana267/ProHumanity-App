import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import ArticleDetail from './ArticleDetail';

const articlesData = [
  {
    id: 1,
    title: 'Amazon Rainforest',
    preview: 'Based on archaeological evidence from an excavation at Caverna da Pedra Pintada, human inhabitants first settled in the Amazon ...',
    image: require('./articleImage1.jpg'),
    content: 'Full article text for Article 1...',
  },
  {
    id: 2,
    title: 'Arctic Ocean',
    preview: 'In large parts of the Arctic Ocean, the top layer (about 50 m [160 ft]) is of lower salinity and lower temperature than the rest. It remains relatively stable because',
    image: require('./articleImage2.png'),
    content: 'Full article text for Article 2...',
  },
  {
    id: 3,
    title: 'What is Climate Change?',
    preview: 'Climate change is a long-term change in the average weather patterns that have come to define Earth’s local, regional and global climates.',
    image: require('./articleImage3.jpg'),
    content: 'Full article text for Article 3...',
  },
  
  // Add more articles here
];

const ArticlePreview = ({ article, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ArticleDetail', { article });
      }}
    >
     
      <View style={styles.bigDiv}>
    
        <View style={styles.articleDiv}>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.preview}>{article.preview}</Text>
            <Image style={styles.articleImage} source={article.image} resizeMode="cover" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Articles = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#c4edc4' }}>
      <Text style={styles.bigText}>    Articles </Text>
      <FlatList
        data={articlesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ArticlePreview article={item} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  bigDiv: {
    paddingLeft:20,
    paddingRight:20,
   
    backgroundColor: '#ecf9ec',
    },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    
  },
  preview: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  articleDiv: {
    backgroundColor: "#fff",
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
    
    backgroundColor:"#c4edc4",
    width:500,
  },
  
});

export default Articles;
