import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const BookingScreen = () => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    fatherHusbandName: '',
    mobile: '',
    address: '',
    eventFunction: '',
    amount: '',
    receiptNumber: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/bookings/active')
      .then(response => {
        setAvailableDates(response.data.map((booking: { date: string }) => booking.date));
      })
      .catch(error => console.error('Error fetching available dates:', error));
  }, []);

  const handleSubmit = () => {
    axios.post('http://localhost:8080/api/bookings/book', { ...form, date: selectedDate })
      .then(() => {
        setAvailableDates(availableDates.filter(date => date !== selectedDate));
        Alert.alert('Booking successful!');
      })
      .catch(error => console.error('Error booking date:', error));
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue) => setSelectedDate(itemValue as string)}
      >
        <Picker.Item label="Select a date" value="" />
        {availableDates.map(date => (
          <Picker.Item key={date} label={date} value={date} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={text => setForm({ ...form, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Father/Husband Name"
        value={form.fatherHusbandName}
        onChangeText={text => setForm({ ...form, fatherHusbandName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={form.mobile}
        onChangeText={text => setForm({ ...form, mobile: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={form.address}
        onChangeText={text => setForm({ ...form, address: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Event/Function"
        value={form.eventFunction}
        onChangeText={text => setForm({ ...form, eventFunction: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={form.amount}
        onChangeText={text => setForm({ ...form, amount: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Receipt Number"
        value={form.receiptNumber}
        onChangeText={text => setForm({ ...form, receiptNumber: text })}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  }
});

export default BookingScreen;
