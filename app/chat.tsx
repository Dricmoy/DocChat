import React, { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Platform } from "react-native";
import { collection, addDoc, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseconfig';
import uuid from 'react-native-uuid';
import * as SecureStore from 'expo-secure-store';

interface Message {
  id: string;
  text: string;
  createdAt: number;
  senderName: string;
  senderId: string;
}

export default function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputMessage, setInputMessage] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("guest");
  const [deviceId, setDeviceId] = React.useState<string>("");

  const hospitalId = "your_hospital_id_here"; // Replace with actual hospital ID

  useEffect(() => {
    const fetchDeviceId = async () => {
      let savedDeviceId = await getDeviceId();
      if (!savedDeviceId) {
        savedDeviceId = uuid.v4().toString();
        await saveDeviceId(savedDeviceId);
      }
      setDeviceId(savedDeviceId);
    };

    const subscribeToMessages = (deviceId: string) => {
      const q = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc"),
        where("senderId", "==", deviceId)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
          senderName: doc.data().senderName,
          senderId: doc.data().senderId,
        })) as Message[];
        setMessages(messagesData);
      });

      return unsubscribe;
    };

    const initializeChat = async () => {
      await fetchDeviceId();
      const unsubscribe = subscribeToMessages(deviceId);
      return () => unsubscribe();
    };

    initializeChat();
  }, [deviceId]);

  const sendMessage = async () => {
    if (inputMessage.trim() !== "") {
      await addDoc(collection(db, "messages"), {
        text: inputMessage.trim(),
        createdAt: Date.now(),
        senderName: userName,
        senderId: deviceId,
        receiverId: hospitalId,
      });
      setInputMessage("");
    }
  };

  const saveDeviceId = async (deviceId: string) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem('deviceId', deviceId);
      } else {
        await SecureStore.setItemAsync('deviceId', deviceId);
      }
    } catch (error) {
      console.error('Error saving device ID:', error);
    }
  };

  const getDeviceId = async () => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem('deviceId');
      } else {
        return await SecureStore.getItemAsync('deviceId');
      }
    } catch (error) {
      console.error('Error retrieving device ID:', error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.senderText}>Sent by: {item.senderName}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          onSubmitEditing={sendMessage}
        />
        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageContainer: {
    backgroundColor: "#96b87f",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "70%",
    alignSelf: "flex-end",
  },
  senderText: {
    fontSize: 12,
    color: "#666",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#96b87f",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
