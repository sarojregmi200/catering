import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type ActionPopupProps = {
  visible: boolean;
  actionType: 'create' | 'delete';
  onClose: () => void;
  onConfirm: (details: { eventName?: string; participants?: number }) => void;
};

export const ActionPopup = ({ visible, actionType, onClose, onConfirm }: ActionPopupProps) => {
  const [eventName, setEventName] = useState('');
  const [participants, setParticipants] = useState('');
  const backgroundColor = useThemeColor('background');
  const textColor = useThemeColor('text');
  const primaryColor = useThemeColor('primary');
  const dangerColor = useThemeColor('danger');
  const borderColor = useThemeColor('border');

  const handleConfirm = () => {
    onConfirm({
      eventName: actionType === 'create' ? eventName : undefined,
      participants: actionType === 'create' ? parseInt(participants, 10) : undefined,
    });
    setEventName('');
    setParticipants('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.popup, { backgroundColor }]}>
          <Text style={[styles.title, { color: textColor }]}>
            {actionType === 'create' ? 'Create New Event' : 'Confirm Deletion'}
          </Text>
          {actionType === 'create' && (
            <>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: borderColor }]}
                placeholder="Event Name"
                value={eventName}
                onChangeText={setEventName}
              />
              <TextInput
                style={[styles.input, { color: textColor, borderColor: borderColor }]}
                placeholder="Number of Participants"
                keyboardType="numeric"
                value={participants}
                onChangeText={setParticipants}
              />
            </>
          )}
          {actionType === 'delete' && (
            <Text style={{ color: textColor }}>Are you sure you want to delete this event?</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color={textColor} />
            <Button
              title={actionType === 'create' ? 'Create' : 'Delete'}
              onPress={handleConfirm}
              color={actionType === 'create' ? primaryColor : dangerColor}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
