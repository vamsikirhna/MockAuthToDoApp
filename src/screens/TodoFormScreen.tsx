import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';


const TodoSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
});

const TodoFormScreen = ({ navigation, route }: any) => {

    const { addTodo, editTodo }: any = useContext(TodoContext);
    const [date, setDate] = useState<Date | undefined>(
        route.params?.todo?.dueDate ? new Date(route.params.todo.dueDate) : undefined
    );
    const [showDatePicker, setShowDatePicker] = useState(false);

    const initialValues =
    {
        id: route.params?.todo?.id || '',
        title: route.params?.todo?.title || '',
        description: route.params?.todo?.description || '',
        dueDate: route.params?.todo?.dueDate || '',
        status: route.params?.todo?.status || 'pending',
    };


    // const handleSubmit = (values: any) => {
    //     if (values.id) {
    //         editTodo(values.id, { ...values, dueDate: date.toISOString() });
    //     } else {
    //         addTodo({ ...values, dueDate: date.toISOString() });
    //     }
    //     navigation.goBack();
    // };

    const handleSubmit = (values: any) => {
        if (!date) {
            Alert.alert("Please select a due date.");
            return; // Prevent submission if the date is undefined
        }

        const dueDate = date.toISOString(); // Guaranteed to be defined here

        if (values.id) {
            editTodo(values.id, { ...values, dueDate });
        } else {
            addTodo({ ...values, dueDate });
        }

        navigation.goBack();
    };

    console.log("====date", date)

    return (
        <Formik
            style={{ flex: 1 }}
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={TodoSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }: any) => (
                <View style={styles.container}>

                    <TextInput
                        style={styles.input}
                        placeholder="Task Title*"
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                        placeholderTextColor={'#000'}
                    />
                    {errors.title && <Text style={styles.errorTxt}>{errors.title}</Text>}
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#eee',
                            paddingTop: 7,
                            paddingBottom: 5,
                            paddingHorizontal: 12,
                            borderRadius: 8,
                            borderColor: '#000',
                            borderWidth: 1
                        }}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={{ fontSize: 14, color: '#000', paddingBottom: 7, paddingTop: 1 }}>
                            {date ? date.toLocaleDateString() : "Pick Due Date"}
                        </Text>
                    </TouchableOpacity>

                    {/* {showDatePicker && (
                        <DateTimePicker
                            value={date || new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) setDate(selectedDate);
                            }}
                        />
                    )} */}

                    {showDatePicker && (
                        <DateTimePicker
                            value={date ?? new Date()} // Ensures `value` is always a Date object
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false); // Hide the picker after selection
                                if (selectedDate) {
                                    setDate(selectedDate); // Update the `date` state with the selected date
                                }
                            }}
                            minimumDate={new Date()}
                        />
                    )}

                    <TextInput
                        style={[styles.input, { marginTop: 20 }]}
                        placeholder="Description (optional)"
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        placeholderTextColor={'#000'}
                    />


                    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={{ backgroundColor: '#000', borderRadius: 12 }} onPress={handleSubmit}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '800', padding: 12 }}>{values.id ? 'Update Todo' : 'Add Todo'}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}
        </Formik>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 20,
        backgroundColor: '#eee',
    },

    errorTxt: { paddingBottom: 12, color: 'red', fontWeight: 500, marginTop: -15 }
});

export default TodoFormScreen;
