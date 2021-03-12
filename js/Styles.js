import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',

        height: '100%',

        backgroundColor: '#fff',
    },

    inputColumn: {
        display: 'flex',
        flexDirection: 'column',

        padding: '1%',

        borderRightWidth: 1,

        backgroundColor: '#ccc',
    },

    characterSelectRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        marginVertical: '0.25em',
    },

    characterSelect: {

    },

    levelInputRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        marginVertical: '0.25em',
    },

    levelInput: {
        width: '2em',

    },

    ascensionCheckRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        marginVertical: '0.25em',
    },

    resultColumn: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,

        padding: '1%',

        backgroundColor: '#eee',
    },

    characterImage: {
        marginVertical: '0.25em',
    },

    resultText: {
        marginVertical: '0.25em',
    }
});

export default styles;