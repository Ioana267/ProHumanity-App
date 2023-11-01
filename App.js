import {  Text, Platform,  View } from 'react-native';
import { Home, Planet, Settings, Articles } from "./screens";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// Thanks for watching
const Tab =createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 85,
    backgroundColor: "#c4edc4"
  }
}
export default function App() {
  return (
     <NavigationContainer>
       <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Entypo name="home" size={30} color={focused ? "#4F6F52": "#111"} />
                  
                </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="Planet" 
          component={Planet} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Entypo name="globe" size={30} color={focused ? "#4F6F52": "#111"} />
                  
                </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="Articles" 
          component={Articles} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Entypo name="book" size={30} color={focused ? "#4F6F52": "#111"} />
                  
                </View>
              )
            }
          }}
          />
          
          <Tab.Screen 
          name="Settings" 
          component={Settings} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Ionicons name="settings" size={30}  color={focused ? "#4F6F52": "#111"} />
                  
                </View>
              )
            }
          }}
          />
       </Tab.Navigator>
     </NavigationContainer>
)
}