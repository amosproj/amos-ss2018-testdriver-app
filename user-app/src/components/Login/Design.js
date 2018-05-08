
import { StyleSheet} from 'react-native';

export default styles=StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#34515e',
      //alignItems moves items to upper center
      alignItems: 'center',
      //justifyContent moves items to center of page
      justifyContent: 'center'
      
  
    },
    input: {
      height: 40,
      width: 200,
      backgroundColor: '#607d8b',
      marginBottom: 10,
      paddingHorizontal: 10
    },
  
    buttonContainer: {
      backgroundColor: '#62757f',
      paddingVertical: 15,
      width: 200,
      
    },
    buttonText: {
      textAlign: 'center',
      color: '#FFF',
      fontWeight: '700'
  
    }
  });