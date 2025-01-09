import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NoDataFound = ({ text }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.txt}>{text}</Text>
        </View>
    )
}

export default NoDataFound

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: 18,
        color: '#000',
        fontWeight: '800'
    }
})