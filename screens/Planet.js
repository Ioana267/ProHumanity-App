import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, PanResponder, Modal, Platform } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { Mesh, SphereGeometry, MeshStandardMaterial, DirectionalLight, LineLoop, Line, BufferGeometry, BufferAttribute } from 'three';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

const Planet = () => {
  const planetGroup = useRef();
  const lightRef = useRef();
  const navigation = useNavigation();
  const [isTasksModalVisible, setTasksModalVisible] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;
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
    navigation.navigate('Post', { currentUserId: currentUser.uid });
    setTasksModalVisible(!isTasksModalVisible);
  };
 return (
    <View style={styles.container}>
      <CustomHeader1 />
      <TouchableOpacity style={styles.button} onPress={toggleTasksModal}>
        <Icon name="bars" size={30} color="white" />
      </TouchableOpacity>
      <Canvas style={{ marginTop: -200 }} {...panResponder.panHandlers}>
      <directionalLight ref={lightRef} position={[5, 5, 5]} />
        <group ref={planetGroup}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={'green'} />
          </mesh>
          {Array.from({ length: 32 }, (_, i) => (

            <lineLoop key={i} rotation={[0, 0, (Math.PI * 2 * i) / 32]} scale={[1.5, 1.5, 1.5]}>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attachObject={['position', '']}
                  count={180}
                  array={new Float32Array(180 * 3)}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial attach="material" color="black" />
            </lineLoop>
          ))}
          {Array.from({ length: 180 }, (_, i) => i).map((i) => (


            <line key={i} position={[0, Math.sin((Math.PI * i) / 180), Math.cos((Math.PI * i) / 180)]} scale={[1.5, 1, 1]}>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attachObject={['position', '']}
                  count={360}
                  array={new Float32Array(360 * 3)}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial attach="material" color="black" opacity={0.5} transparent />
            </line>
          ))}
        </group>
      </Canvas>
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
                  <Text style={styles.mark} onPress={handlePostPress} >Mark as done</Text>
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
        top:55,
      },
      android: {
        // Android specific styles
        top:45,
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
});

export default Planet;