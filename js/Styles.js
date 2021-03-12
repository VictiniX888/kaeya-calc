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

        marginVertical: '2%',
    },

    characterSelect: {

    },

    levelInputRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        marginVertical: '2%',
    },

    levelInput: {
        width: '2em',

    },

    ascensionCheckRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        marginVertical: '2%',
    },

    resultColumn: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,

        padding: '1%',

        backgroundColor: '#eee',
    },

    resultText: {
        lineHeight: '180%',
    }
});

export default styles;