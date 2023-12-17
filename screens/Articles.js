import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

const articlesData = [
    {
      id: 1,
      title: 'Amazon Rainforest',
      preview: 'Based on archaeological evidence from an excavation at Caverna da Pedra Pintada, human inhabitants first settled in the Amazon ...',
      image: require('./articleImage1.jpg'),
      content: ' The Amazon rainforest is a vast and ecologically diverse tropical rainforest located in South America, primarily in Brazil, but also extending into Peru, Colombia, Venezuela, Ecuador, Bolivia, Guyana, Suriname, and French Guiana. It is the largest rainforest on Earth and plays a crucial role in regulating the  climate.The Amazon is home to an incredibly diverse range of plant and animal species. It is estimated that around 390 billion individual trees representing approximately 16,000 different species can be found in the region. \n\n The rainforest also hosts a wide variety of mammals, birds, reptiles, and insects. The Amazon River, the second-longest river in the world, flows through the heart of the rainforest. Its extensive network of tributaries and streams is vital for the regional ecology. The Amazon plays a critical role in regulating the climate. It acts as a carbon sink, absorbing and storing large amounts of carbon dioxide, which helps mitigate global warming. The forest also produces a significant portion of the  oxygen. The rainforest faces numerous threats, including deforestation, illegal logging, agriculture (such as cattle ranching and soy cultivation), and infrastructure development. \n\n These activities contribute to the loss of biodiversity, disrupt local ecosystems, and release stored carbon into the atmosphere. The Amazon is home to a large number of indigenous peoples who have lived in harmony with the rainforest for generations. These communities often depend on the forest for their livelihoods and have unique cultural and spiritual connections to their environment. Various organizations and governments are working to protect the Amazon through conservation initiatives and sustainable development projects. International efforts are also underway to address deforestation and promote responsible land use. The Amazon rainforest is characterized by distinct ecosystems, including flooded forests, savannas, and upland forests. \n\n The variety of habitats contributes to the high level of biodiversity found in the region. The Amazon rainforest is a rich source of medicinal plants, and indigenous communities have long used the forest resources for traditional medicine. Many pharmaceutical drugs have been developed from compounds found in these plants.'  
    },
    {
      id: 2,
      title: 'Arctic Ocean',
      preview: 'In large parts of the Arctic Ocean, the top layer (about 50 m [160 ft]) is of lower salinity and lower temperature than the rest. It remains relatively stable because',
      image: require('./articleImage2.png'),
      content: 'The Arctic Ocean is the smallest and shallowest of the world s five major oceans. \n\n It spans an area of approximately 14,060,000 km2 (5,430,000 sq mi) and is known as one of the coldest of oceans. The International Hydrographic Organization (IHO) recognizes it as an ocean, although some oceanographers call it the Arctic Mediterranean Sea. It has also been described as an estuary of the Atlantic Ocean. It is also seen as the northernmost part of the all-encompassing World Ocean. The Arctic Ocean includes the North Pole region in the middle of the Northern Hemisphere and extends south to about 60°N. \n\n The Arctic Ocean is surrounded by Eurasia and North America, and the borders follow topographic features: the Bering Strait on the Pacific side and the Greenland Scotland Ridge on the Atlantic side. It is mostly covered by sea ice throughout the year and almost completely in winter. The Arctic Ocean s surface temperature and salinity vary seasonally as the ice cover melts and freezes; its salinity is the lowest on average of the five major oceans, due to low evaporation, heavy fresh water inflow from rivers and streams, and limited connection and outflow to surrounding oceanic waters with higher salinities. The summer shrinking of the ice has been quoted at 50%. The US National Snow and Ice Data Center (NSIDC) uses satellite data to provide a daily record of Arctic sea ice cover and the rate of melting compared to an average period and specific past years, showing a continuous decline in sea ice extent. In September 2012, the Arctic ice extent reached a new record minimum. \n\n Compared to the average extent (1979–2000), the sea ice had diminished by 49%.',
    },
    {
      id: 3,
      title: 'What is Climate Change?',
      preview: 'Climate change is a long-term change in the average weather patterns that have come to define Earth’s local, regional and global climates.',
      image: require('./articleImage3.jpg'),
      content: 'In common usage, climate change describes global warming—the ongoing increase in global average temperature—and its effects on Earth s climate system. Climate change in a broader sense also includes previous long-term changes to Earth s climate. The current rise in global average temperature is more rapid than previous changes, and is primarily caused by humans burning fossil fuels. Fossil fuel use, deforestation, and some agricultural and industrial practices add to greenhouse gases, notably carbon dioxide and methane.\n\n Greenhouse gases absorb some of the heat that the Earth radiates after it warms from sunlight. Larger amounts of these gases trap more heat in Earth s lower atmosphere, causing global warming. Climate change is causing a range of increasing impacts on the environment. Deserts are expanding, while heat waves and wildfires are becoming more common. Amplified warming in the Arctic has contributed to melting permafrost, glacial retreat and sea ice loss. Higher temperatures are also causing more intense storms, droughts, and other weather extremes. Rapid environmental change in mountains, coral reefs, and the Arctic is forcing many species to relocate or become extinct.[9] Even if efforts to minimise future warming are successful, some effects will continue for centuries. These include ocean heating, ocean acidification and sea level rise. Climate change threatens people with increased flooding, extreme heat, increased food and water scarcity, more disease, and economic loss. Human migration and conflict can also be a result.\n\n The World Health Organization (WHO) calls climate change the greatest threat to global health in the 21st century. Societies and ecosystems will experience more severe risks without action to limit warming. Adapting to climate change through efforts like flood control measures or drought-resistant crops partially reduces climate change risks, although some limits to adaptation have already been reached. \n\n Poorer communities are responsible for a small share of global emissions, yet have the least ability to adapt and are most vulnerable to climate change.',
    },
    
    // Add more articles here
  ];
  
const ArticlePreview = ({ article, navigation }) => {
    return (
      <TouchableOpacity 
        onPress={() => {
          navigation.navigate('ArticleDetail', { article: article });
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
    //fontFamily: 'monteserrat',
    backgroundColor:"#c4edc4",
    width:500,
  },
  
});

export default Articles;
