import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, PanResponder, Modal, Platform } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { Mesh, SphereGeometry, MeshStandardMaterial, DirectionalLight, LineLoop, Line, LineDashedMaterial, BufferGeometry, BufferAttribute  } from 'three';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';



const Planet = () => {
  const [neededXP]=useState(0);
  const planetGroup = useRef();
  const lightRef = useRef();
  const navigation = useNavigation();
  const [isTasksModalVisible, setTasksModalVisible] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const [userXP, setUserXP] = useState(0); // Add this line to initialize xp state
  const [userLevel, setUserLevel]=useState(1); //initialize level state with 0
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const rotationX = gestureState.dy / 100;
        const rotationY = gestureState.dx / 100;
        planetGroup.current.rotation.x = rotationX;
        planetGroup.current.rotation.y = rotationY;
      },
    })
  ).current;
//am transferat din firebase aici pentru xp uri
  useEffect(() => {
    // Fetch the xp information from Firestore
    const fetchUserXP = async () => {
      try {
        const userDocRef = doc(getFirestore(), 'Users', user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          const userData = doc.data();
          if (userData && userData.xp) {
            setUserXP(userData.xp);
          }
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching xp.', error.message);
      }
    };
    // Fetch the level information from Firestore
    const fetchLevel = async () => {
      try {
        const userDocRef = doc(getFirestore(), 'Users', user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          const userData = doc.data();
          if (userData && userData.level) {
            setUserLevel(userData.level);
          }
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching level.', error.message);
      }
    };
    // Call the fetchUserXP function
    fetchUserXP();
    //call the fetchLevel Function
    fetchLevel();
  },[]);

  const CustomHeader1 = () => {
    return (
      <SafeAreaView style={styles.header}>
        <Text style={styles.bigText}>Planet</Text>
      </SafeAreaView>
    );
  };
  const toggleTasksModal = () => {
    setTasksModalVisible(!isTasksModalVisible);
  };
  const handlePostPress = () => {
    console.log('Post button pressed');
    navigation.navigate('Post', { currentUserId: user.uid });
    setTasksModalVisible(!isTasksModalVisible);
  };
  //imaginea planetei in functie de nivel
  const planetImageLevel =(userLevel)=>{
    if (userLevel===1) return require('./nivel1.png');
    else if (userLevel===2) return require('./nivel2.png');
    else if (userLevel===3) return require('./nivel3.png');
    else if (userLevel===4) return require('./nivel4.png');
    else if (userLevel===5) return require('./nivel5.png');
    else if (userLevel===6) return require('./nivel6.png');
    else if (userLevel===7) return require('./nivel7.png');
    else if (userLevel===8) return require('./nivel8.png');
    else if (userLevel===9) return require('./nivel9.png');
    else if (userLevel===10) return require('./nivel10.png');
    else if (userLevel===11) return require('./nivel11.png');
    else if (userLevel===12) return require('./nivel12.png');
    else if (userLevel===13) return require('./nivel13.png');
    else if (userLevel===14) return require('./nivel14.png');
    else if (userLevel===15) return require('./nivel15.png');
  }
  //function to calculate how many xp you need to reach next level
  const nedeedxpfunction=(userLevel, userXP) =>{
    if (userLevel==1) return (
      <View>
       <Text style={styles.neededXpText}>You need {30 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    ); else if (userLevel==2) return (
      <View>
        <Text style={styles.neededXpText}>You need {60 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==3) return (
      <View>
        <Text style={styles.neededXpText}>You need {100 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==4) return (
      <View>
        <Text style={styles.neededXpText}>You need {150 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==5) return (
      <View>
        <Text style={styles.neededXpText}>You need {200 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==6) return (
      <View>
        <Text style={styles.neededXpText}>You need {250 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==7) return (
      <View>
        <Text style={styles.neededXpText}>You need {300 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==8) return (
      <View>
        <Text style={styles.neededXpText}>You need {350 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==9) return (
      <View>
        <Text style={styles.neededXpText}>You need {400 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==10) return (
      <View>
        <Text style={styles.neededXpText}>You need {450 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==11) return (
      <View>
        <Text style={styles.neededXpText}>You need {500 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==12) return (
      <View>
        <Text style={styles.neededXpText}>You need {550 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==13) return (
      <View>
        <Text style={styles.neededXpText}>You need {600 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==14) return (
      <View>
        <Text style={styles.neededXpText}>You need {700 - userXP} xp to reach level {userLevel+1} </Text>
      </View>
    );
    else if (userLevel==15) return (
      <View>
        <Text style={styles.xplevelText}>You saved the planet! Yey! </Text>
      </View>
    );
  }
 return (
    <View style={styles.container}>
      <CustomHeader1 />
      <TouchableOpacity style={styles.button} onPress={toggleTasksModal}>
        <Icon name="bars" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.xpBox}>
            <View style={styles.greenBox}>
                  <Text style={styles.xplevelText}>{userXP} xp</Text>
            </View>
       </View>
       <View style={styles.levelBox}>
            <View style={styles.greenBox}>
                  <Text style={styles.xplevelText}>level {userLevel}</Text>
            </View>
       </View>
      <View style={styles.planetContainer}>
        <Image source={planetImageLevel(userLevel) } style={styles.planetImage} />
        <View/>
        
      </View>
      <View style={styles.neededXPBox}>
            <View style={styles.neededXPgreenBox}>
                  <Text>{nedeedxpfunction(userLevel, userXP)}</Text>
            </View>
       </View>
      <Modal
      animationType="fade"
      transparent={true}
        visible={isTasksModalVisible}
        onRequestClose={toggleTasksModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tasks</Text>
            <View style={styles.taskItemContainer}>
                <Text style={styles.taskItem}>1. Pick up trash in a park.</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.mark} onPrress={handlePostPress} >Mark as done</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
              <View style={styles.taskItemContainer}>
                <Text style={styles.taskItem}>2. Plant a tree.</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.mark} onPress={handlePostPress}>Mark as done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <View style={styles.taskItemContainer}>
                <Text style={styles.taskItem}>3. Use your bike to go to a friend instead of the car.</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.mark} onPress={handlePostPress}>Mark as done</Text>
                </TouchableOpacity>
              </View>
            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleTasksModal}>
            <Icon name="close" size={25} color="black" backgroundColor= "#F1FFF2" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#E0F6E1',
 },
 bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: '#3C683E',
    width: 600,
    paddingLeft: 10,
    paddingBottom: 10,
    color: 'white',
    ...Platform.select({
      ios: {
        // iOS specific styles
        paddingBottom: 10,
      },
      android: {
        // Android specific styles
        paddingBottom: 0,
      }
    })
 },
 button: {
    position: 'absolute',
   
    right: 20,
    zIndex: 10,
    color:'white',
    ...Platform.select({
      ios: {
        // iOS specific styles
        top:30,
      },
      android: {
        // Android specific styles
        top:40,
      }
    })
 },
 modalContainer: {
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  paddingTop: 20,
  paddingLeft: 100,
  
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
mark: {
  color:'white',
  fontWeight: '400',
  textAlign:'center',
  
},
modalContent: {
  backgroundColor: '#F1FFF2',
  padding: 20,
  borderRadius: 10,
  elevation: 5,
  borderColor: '#3C683E',
  borderWidth: 4,
},
modalTitle: {
  fontSize: 30,
  fontWeight: '800',
  marginBottom: 10,
},
modalCloseButton: {
  backgroundColor: '#F1FFF2',
  paddingTop:5,
  borderRadius: 5,
  marginTop: 20,
  fontWeight: 'normal',
},
taskContainer: {
  marginTop: 10,
 
},
taskItem: {
  fontSize: 16,
  marginBottom: 5,
  fontWeight:'400',
  
  
 
},
separator: {
  height: 1,
  backgroundColor: 'black',
  marginVertical: 5,
},

addButton: {
  backgroundColor: '#4A724C',
  paddingVertical:7,
  paddingHorizontal:7,
 
  borderRadius:15,
  width:'100%',
  marginBottom: 10,
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 0,

  backgroundColor: '#3C683E',
  ...Platform.select({
    ios: {
      // iOS specific styles
      paddingBottom: 5,
    },
    android: {
      // Android specific styles
      height: 80, 
      alignItems: 'flex-end',
      paddingBottom: 5,
    }
  })
},
xplevelText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white', 

  
},
xpBox: {
  ...Platform.select({
    ios: {
      // iOS specific styles
      marginVertical: 10, 
      paddingLeft: 10,
      paddingRight: 310,
    },
    android: {
      // Android specific styles
      marginVertical: 10, 
      paddingLeft: 10,
      paddingRight: 270,
    }
  })
},
levelBox: {
  ...Platform.select({
    ios: {
      // iOS specific styles
      marginVertical: -43, 
      paddingLeft: 313,
      paddingRight: 10,
    },
    android: {
      // Android specific styles
      marginVertical: -43, 
      marginBottom: 80,
      paddingLeft: 250,
      paddingRight: 10,
    }
  })
 
},
greenBox: {
  backgroundColor: '#3C683E',
  paddingHorizontal: 10, 
  paddingVertical: 5, 
  borderRadius: 5, 
  paddingHorizontal: 10, 
  paddingVertical: 5, 
 
},
neededXpText:{
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white', 
  ...Platform.select({
    ios: {
      // iOS specific styles
    },
    android: {
      // Android specific styles
      
    }
  })

},
neededXPBox: {
  marginVertical: 40, 
},
neededXPgreenBox: {
  backgroundColor: '#3C683E',
  paddingLeft:55,
  paddingRight:55,
  paddingBottom:10,
  paddingTop:10,
},
planetImage: {
  width: 260,
  height: 260,
  borderRadius: 130,
},
planetContainer: {
  alignItems: 'center',

  ios: {
    // iOS specific styles
    marginTop: 130,
  },
  android: {
    // Android specific styles
    marginTop: 200,
  }
},
});

export default Planet;