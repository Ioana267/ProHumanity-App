import React from 'react';
import { View, Text, Image } from 'react-native';

const ArticleDetail = ({ route }) => {
  const { article } = route.params;

  return (
    <View>
      <Image source={{ uri: article.image }} />
      <Text>{article.title}</Text>
      <Text>{article.content}</Text>
    </View>
  );
};

export default ArticleDetail;