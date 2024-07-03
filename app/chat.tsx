import React, { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Pressable } from "react-native";
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../app/firebaseconfig';

interface Message {
  id: string;
  text: string;
  createdAt: number;
}

export default function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputMessage, setInputMessage] = React.useState<string>("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt
      })) as Message[];
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (inputMessage.trim() !== "") {
      await addDoc(collection(db, "messages"), {
        text: inputMessage.trim(),
        createdAt: Date.now(),
      });
      setInputMessage("");
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
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "70%",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
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
    backgroundColor: "#007BFF",
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
