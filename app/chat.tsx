import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View, TextInput, Pressable, FlatList } from "react-native";
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
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

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

export default function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputMessage, setInputMessage] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("guest");
  const [deviceId, setDeviceId] = React.useState<string>("");

  const hospitalId = "your_hospital_id_here"; // Replace with actual hospital ID
  const key = "testing"
  const value = "test-val"
  save(key, value)
  getValueFor(key)

  useEffect(() => {
    // Set userName to "guest" by default or use authenticated user's name if available
    setUserName("guest");

    // Query to listen for new messages ordered by creation time
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
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

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (inputMessage.trim() !== "") {
      // Add new message to Firestore
      await addDoc(collection(db, "messages"), {
        text: inputMessage.trim(),
        createdAt: Date.now(),
        senderName: userName, // Use userName for senderName
        senderId: deviceId, // Use deviceId for senderId
        receiverId: hospitalId, // Fixed receiver ID
      });
      setInputMessage(""); // Clear input field after sending message
    }
  };

  return (
    <View style={styles.container}>
      {/* Render the list of messages */}
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
        inverted // Start from bottom
      />
      {/* Input area for typing messages */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          onSubmitEditing={sendMessage} // Send message on submit
        />
        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Styles for Chat component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: "flex-end", // Messages start from bottom
  },
  messageContainer: {
    backgroundColor: "#96b87f", // Soft green background for messages
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "70%", // Max width for message container
    alignSelf: "flex-end", // Align messages to right
  },
  senderText: {
    fontSize: 12,
    color: "#666", // Dark gray color for sender text
  },
  messageText: {
    fontSize: 16,
    color: "#333", // Dark color for message text
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
    backgroundColor: "#96b87f", // Soft green color for send button
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#fff", // White color for send button text
    fontSize: 16,
    fontWeight: "bold",
  },
});
