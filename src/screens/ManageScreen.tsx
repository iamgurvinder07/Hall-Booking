import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ManageScreen = () => {
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [bookingInfo, setBookingInfo] = useState<any | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/bookings/booked')
      .then(response => {
        setBookedDates(response.data.map((booking: { date: string }) => booking.date));
      })
      .catch(error => console.error('Error fetching booked dates:', error));
  }, []);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    axios.get(`http://localhost:8080/api/bookings/${date}`)
      .then(response => {
        setBookingInfo(response.data);
      })
      .catch(error => console.error('Error fetching booking info:', error));
  };

  const handleCancel = () => {
    axios.post(`http://localhost:8080/api/bookings/cancel`, { date: selectedDate })
      .then(() => {
        setBookedDates(bookedDates.filter(date => date !== selectedDate));
        setBookingInfo(null);
        Alert.alert('Booking cancelled successfully!');
      })
      .catch(error => console.error('Error cancelling booking:', error));
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue) => handleDateChange(itemValue as string)}
      >
        <Picker.Item label="Select a date" value="" />
        {bookedDates.map(date => (
          <Picker.Item key={date} label={date} value={date} />
        ))}
      </Picker>
      {bookingInfo && (
        <View style={styles.infoContainer}>
          <Text>Name: {bookingInfo.name}</Text>
          <Text>Father/Husband Name: {bookingInfo.fatherHusbandName}</Text>
          <Text>Mobile: {bookingInfo.mobile}</Text>
          <Text>Address: {bookingInfo.address}</Text>
          <Text>Event/Function: {bookingInfo.eventFunction}</Text>
          <Text>Amount: {bookingInfo.amount}</Text>
          <Text>Receipt Number: {bookingInfo.receiptNumber}</Text>
          <Button title="Cancel Booking" onPress={handleCancel} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  infoContainer: {
    marginTop: 20
  }
});

export default ManageScreen;
