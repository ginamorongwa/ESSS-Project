import React, {useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, Image } from 'react-native';

const Stars = ()=>{
    const [defautRating, setdefaultRating] = useState(0)
    const [maxRating, setmaxRating]= useState([1,2,3,4,5])
  
    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImgCorner ='https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
  
    const CustomRatingBar = () => {
      return (
        <View style = {styles.CustomRatingBarStyle}>
          {
            maxRating.map((item, key) => {
              return(
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={key}
                  onPress={()=> setdefaultRating(item)}
                >
                  <Image
                    style = {styles.starImgStyle}
                    source={
                      item <= defautRating
                        ? {uri: starImgFilled}
                        : {uri: starImgCorner}
                    }
                  />
  
                </TouchableOpacity>
              )
            })
          }
  
        </View>
     )
    }
  
    return(
      <SafeAreaView style={styles.container}>
        <CustomRatingBar/>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 1,
      padding: 10,
      justifyContent: 'center',
    },
    textStyle : {
      textAlign : 'center',
      fontSize: 23,
      marginTop: 20
    },
    CustomRatingBarStyle: {
      justifyContent: 'flex-start',
      flexDirection: 'row'
    },
    starImgStyle: {
      flex:1,
      width: 20,
      height : 20,

    }
  });

  export default Stars;