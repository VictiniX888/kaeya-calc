import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',

    fontSize: 14,

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

  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: '0.25em',
  },

  levelInput: {
    width: '2em',
  },

  statInput: {
    width: '3em',
  },

  buttonGroupContainer: {
    height: 'initial',

    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,

    borderRadius: 2,
    borderColor: '#000',

    backgroundColor: '#ccc',
  },

  buttonGroupButtonContainer: {
    borderRightColor: '#000',
    width: '4em',
  },

  buttonGroupText: {
    fontSize: '1em',
    fontWeight: 400,
    color: '#000',
  },

  buttonGroupSelectedButton: {
    backgroundColor: '#eee',
  },

  buttonGroupSelectedText: {
    color: '#000',
  },

  resultColumn: {
    display: 'flex',
    flexDirection: 'column',

    borderRightWidth: 1,

    backgroundColor: '#eee',
  },

  resultBlockNoBorder: {
    display: 'flex',
    flexDirection: 'column',

    padding: '0.8em',
  },

  resultBlock: {
    display: 'flex',
    flexDirection: 'column',

    padding: '0.8em',
    borderBottomWidth: 1,
  },

  artifactBlockNoBorder: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '0.5em',
    paddingBottom: '0.7em',
  },

  artifactBlock: {
    display: 'flex',
    flexDirection: 'column',

    paddingTop: '0.5em',
    paddingBottom: '0.7em',

    borderStyle: 'dashed',
    borderBottomWidth: 1,
  },

  characterImage: {
    marginVertical: '0.25em',
  },

  titleText: {
    fontSize: '1.5em',
    fontWeight: '200',

    marginVertical: '0.17em',
  },

  artifactType: {
    fontSize: '1.2em',
    fontWeight: '200',

    marginVertical: '0.21em',
  },

  artifactStatType: {
    marginVertical: '0.25em',
  },

  resultText: {
    marginVertical: '0.25em',
  },

  fillerColumn: {
    flexGrow: 1,

    backgroundColor: '#eee',
  },
});
