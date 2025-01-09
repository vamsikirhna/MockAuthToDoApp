import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface DropDownProps {
    placeholder: string;
    data: string[];
    setValue: (value: string) => void;
    id?: any,
    updateTodo?: (id: any, status: string) => void;  // Optional function for updating todo status
}

const DropDown = ({ placeholder, data, setValue, id, updateTodo }: DropDownProps) => {
    return (
        <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
                setValue(selectedItem)
                updateTodo && updateTodo(id, selectedItem)
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {selectedItem && selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1) || placeholder}
                        </Text>
                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                        <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                        <Text style={styles.dropdownItemTxtStyle}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    )
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        // width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#151E26',
        textAlign: 'center',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});

export default DropDown