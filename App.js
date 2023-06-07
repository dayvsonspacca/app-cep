import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [ info, setInfo ] = useState({});
  const [ cep, setCep ]   = useState('');

  const onSubmit = async () => {
    let parte1 = cep.substring(0, 5);
    let parte2 = cep.substring(5);
    
    let cepFormatado = parte1 + "-" + parte2;
    
    console.log(`https://cdn.apicep.com/file/apicep/${cepFormatado}.json`);

    await fetch(`https://cdn.apicep.com/file/apicep/${cepFormatado}.json`)
    .then(response => response.json())
    .then(data => setInfo(data))
    .catch(error => console.log(error));
    console.log(info);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Estado: {info.state}</Text>
        <Text style={styles.infoLabel}>Cidade: {info.city}</Text>
        <Text style={styles.infoLabel}>Bairro: {info.district}</Text>
        <Text style={styles.infoLabel}>Endereço: {info.address}</Text>
      </View>
      <View style={styles.form}>
        <TextInput onChangeText={(value) => setCep(value)} style={styles.input} placeholder='Insira um CEP...'></TextInput>
        <TouchableOpacity onPress={() => onSubmit()} style={styles.btn}>
          <Text style={{ color: 'white' }}>Consultar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    width: '100%',
    flex:1,
    backgroundColor: '#d9d9d9',
    margin: 10,
    borderRadius: 10
  },
  infoLabel: {
    fontSize: 32,
    fontWeight: 'bold'
  }, 
  form: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#001100',
    height: 60
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4522ff',
    width: '20%'
  },
  input: {
    width: '80%',
    color: 'white',
    padding: 5
  }
});
