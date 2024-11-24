import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function EditorScreen() {
  const [code, setCode] = useState('// Start coding here');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.editor}
        multiline
        value={code}
        onChangeText={setCode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  editor: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    fontFamily: 'monospace',
  },
});

