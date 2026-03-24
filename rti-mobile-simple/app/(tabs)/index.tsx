import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  StatusBar
} from "react-native";

import {
  suggestAuthority,
  generateRTI,
  analyzeResponse
} from "../../api";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [letter, setLetter] = useState("");

  const [responseText, setResponseText] = useState("");
  const [days, setDays] = useState("");
  const [score, setScore] = useState<any>(null);

  const handleSuggest = async () => {
    const res = await suggestAuthority(query);
    setDepartment(res.department);
  };

  const handleGenerate = async () => {
    const res = await generateRTI({
      name: "Ram",
      address: "India",
      department,
      query
    });
    setLetter(res.letter);
  };

  const handleAnalyze = async () => {
    const res = await analyzeResponse({
      responseText,
      daysTaken: Number(days)
    });
    setScore(res);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>RTI Mobile App</Text>

      {/* RTI Generator */}
      <Text style={styles.section}>RTI Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your RTI query"
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />

      <Button title="Suggest Authority" onPress={handleSuggest} />
      <Text style={styles.text}>Department: {department}</Text>

      <Button title="Generate RTI" onPress={handleGenerate} />

      {letter ? <Text style={styles.output}>{letter}</Text> : null}

      {/* Analyzer */}
      <Text style={styles.section}>Response Analyzer</Text>

      <TextInput
        style={styles.input}
        placeholder="Paste response"
        placeholderTextColor="#888"
        value={responseText}
        onChangeText={setResponseText}
      />

      <TextInput
        style={styles.input}
        placeholder="Days taken"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={days}
        onChangeText={setDays}
      />

      <Button title="Analyze" onPress={handleAnalyze} />

      {score && (
        <View style={styles.result}>
          <Text style={styles.text}>Final Score: {score.finalScore}</Text>
          <Text style={styles.text}>Time: {score.timeScore}</Text>
          <Text style={styles.text}>Completeness: {score.completenessScore}</Text>
          <Text style={styles.text}>Compliance: {score.complianceScore}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000"
  },
  section: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: "#000"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#000"
  },
  text: {
    color: "#000",
    marginBottom: 10
  },
  output: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginTop: 10,
    color: "#000"
  },
  result: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e8f5e9"
  }
});