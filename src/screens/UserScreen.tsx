import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const UserScreen = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [bookingInfo, setBookingInfo] = useState<any | null>(null);
  const [contacts, setContacts] = useState([
    { name: 'S. Harpal Singh Ranjan', phone: '9118134567' },
    { name: 'S. Jeetender Singh Munshi', phone: '8008131326' },
    { name: 'S. Surjeet Singh (Sanju)', phone: '7013542208' },
    { name: 'S. Harmesh Singh Ranjan', phone: '9000801233' },
  ]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/bookings/all')
      .then(response => {
        setDates(response.data.map((booking: { date: string }) => booking.date));
      })
      .catch(error => console.error('Error fetching dates:', error));
  }, []);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const booking = dates.find((bookingDate) => bookingDate === date);
    setBookingInfo(booking ? booking : null);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue) => handleDateChange(itemValue as string)}
      >
        <Picker.Item label="Select a date" value="" />
        {dates.map(date => (
          <Picker.Item key={date} label={date} value={date} />
        ))}
      </Picker>
      {selectedDate && (
        <View style={styles.infoContainer}>
          {bookingInfo ? (
            <Text>Booked by: {bookingInfo.name}</Text>
          ) : (
            <View>
              <Text>The hall is available on {selectedDate}</Text>
              <Text>Contact the following for booking:</Text>
              {contacts.map(contact => (
                <Text key={contact.phone}>{contact.name}: {contact.phone}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  infoContainer: {
    marginTop: 20,
  },
});

export default UserScreen;