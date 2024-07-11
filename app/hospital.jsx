import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseconfig';

const Dashboard = ({ navigation }) => {
  const [uniqueDeviceIds, setUniqueDeviceIds] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), where("receiverId", "==", "your_hospital_id_here")); // Replace with actual hospital ID

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const deviceIds = new Set(); // Use a Set to store unique device IDs

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        deviceIds.add(data.senderId); // Add each sender ID to the Set
      });

      const uniqueDeviceIdsArray = Array.from(deviceIds); // Convert Set to Array
      setUniqueDeviceIds(uniqueDeviceIdsArray);
    }, (error) => {
      console.error('Error fetching device IDs: ', error);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const renderDeviceIdItem = ({ item }) => (
    <TouchableOpacity style={styles.deviceIdItem} onPress={() => handleDeviceIdPress(item)}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.charAt(0)}</Text>
      </View>
      <Text style={styles.deviceIdText}>Sender ID: {item}</Text>
    </TouchableOpacity>
  );

  const handleDeviceIdPress = (deviceId) => {
    console.log('Selected device ID:', deviceId);
    // Implement navigation or further handling here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Chats</Text>
      <FlatList
        data={uniqueDeviceIds}
        renderItem={renderDeviceIdItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.deviceIdList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  deviceIdList: {
    flex: 1,
  },
  deviceIdItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#96b87f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceIdText: {
    fontSize: 18,
    color: '#555',
  },
});

export default Dashboard;
