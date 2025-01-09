import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { TodoContext } from '../TodoContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icons
import DropDown from '../components/DropDown';
import NoDataFound from '../components/NoDataFound';
import { AuthContext } from '../AuthContext';

const TodoListScreen = ({ navigation }: any) => {
    const { todos, deleteTodo, editTodo }: any = useContext(TodoContext);
    const [filter, setFilter] = useState('all');
    const [sortCriteria, setSortCriteria] = useState('date');
    const { logout }: any = useContext(AuthContext);



    // Filter todos based on status
    const filteredTodos = todos.filter((todo: any) => {
        if (filter === 'all') return true;
        return todo.status === filter;
    });

    const sortedTodos = filteredTodos.sort((a: any, b: any) => {
        if (sortCriteria === 'date') {
            const dateA = new Date(a.dueDate).toLocaleDateString() ? new Date(a.dueDate).getTime() : Infinity;
            const dateB = new Date(b.dueDate).toLocaleDateString() ? new Date(b.dueDate).getTime() : Infinity;
            return dateA - dateB;
        } else if (sortCriteria === 'status') {
            return a.status.localeCompare(b.status);
        }
        return 0;
    });

    const updateTodoStatus = (id: string, newStatus: string) => {
        const todo = todos.find((t: any) => t.id === id);
        if (todo) {
            editTodo(id, { ...todo, status: newStatus });
        }
    };



    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.header}>Todo List</Text>
                <Icon name="logout" size={24} color="#c603fc" style={{ position: 'absolute', right: 0 }} onPress={() => logout()} />
            </View>
            <View style={{ marginBottom: 10 }}>
                <DropDown placeholder="Filter by Status" data={['all', 'pending', 'completed']} setValue={setFilter} />
            </View>

            {sortedTodos.length === 0 ? (
                <NoDataFound text="No ToDo List Found" />
            ) :
                <FlatList
                    data={sortedTodos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.todoContent}>
                                <Text
                                    style={
                                        item.status === 'completed' ? styles.completed : styles.todoTitle
                                    }
                                >
                                    {item.title}
                                </Text>
                                <Text style={styles.todoDetails}>
                                    {item.dueDate
                                        ? `Due: ${new Date(item.dueDate).toLocaleDateString()}`
                                        : 'No Due Date'}
                                </Text>
                            </View>

                            <View style={{ width: 150 }}>
                                <DropDown placeholder={item.status.charAt(0).toUpperCase() + item.status.slice(1)} data={['pending', 'completed']} setValue={setFilter} id={item.id} updateTodo={updateTodoStatus} />
                            </View>

                            <View style={styles.actions}>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={() => navigation.navigate('TodoForm', { todo: item })}
                                >
                                    <Icon name="edit" size={24} color="#6200EE" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={() => deleteTodo(item.id)}
                                >
                                    <Icon name="delete" size={24} color="#D32F2F" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            }


            <TouchableOpacity
                onPress={() => navigation.navigate('TodoForm')}
                style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#000', position: 'absolute', bottom: 0, right: 0, margin: 20 }}
            >
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 35 }}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9FAFB',
    },
    header: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: '800',
        color: '#c603fc',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    picker: {
        flex: 1,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        marginHorizontal: 4,
    },
    card: {

        backgroundColor: '#FFF',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    todoContent: {
        marginBottom: 8,
        flex: 1,
    },
    todoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    completed: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
        textDecorationLine: 'line-through',
    },
    todoDetails: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    statusPicker: {
        marginVertical: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    iconButton: {
        marginLeft: 8,
    },
});

export default TodoListScreen;






