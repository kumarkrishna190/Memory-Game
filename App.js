'use strict';
import React, { Component, useState, useEffect } from 'react';
import { Dimensions, Text, View, StyleSheet, useColorScheme, FlatList, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default function App(props) {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const {width, height} = Dimensions.get('window');
    const wp = (widthPer) => {
        return (width * widthPer) / 100;
    }
    
    const hp = (heightPer) => {
        return (height * heightPer) / 100;
    }

    const [cardList, setCardList] = useState(['A','B','C','D','E','F','G','H','A','B','C','D','E','F','G','H']);
    const [pairedCardList, setPairedCardList] = useState([]);
    const [openCardIndex, setOpenCardIndex] = useState(-1);
    const [openSecondCardIndex, setOpenSecondCardIndex] = useState(-1);
    const [numberOfAttempt, setNumberOfAttempt] = useState(0);

    useEffect(() => {
        shuffleCards(cardList);
    }, [])

    const  shuffleCards = (array) => {
        let i = array.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
    }

    const onCardPress = (item, index) => {
        if (openCardIndex != -1) {
            setOpenSecondCardIndex(index)
            setNumberOfAttempt(numberOfAttempt + 1)
            console.log('match',cardList[openCardIndex] == item)
            if (cardList[openCardIndex] == item) {
                let pairedCardListCopy = [...pairedCardList];
                pairedCardListCopy.push(item);
                setPairedCardList(pairedCardListCopy);
                setOpenCardIndex(-1);
                setOpenSecondCardIndex(-1)
            }else {
                setTimeout(()=>{
                    setOpenCardIndex(-1);
                    setOpenSecondCardIndex(-1)
                },1000)
            }
        }else{
            setOpenCardIndex(index)
        }
    }

    const restart = () =>{
        setPairedCardList([]);
        setNumberOfAttempt(0);
        setOpenCardIndex(-1);
        setOpenSecondCardIndex(-1)
        shuffleCards(cardList);
    }


    const keyExtractor = (item, index) => item + index;

    const renderCards = ({item, index}) =>{console.log('renderCards', item, index)
        if (pairedCardList.includes(item) || openCardIndex == index || openSecondCardIndex == index){
            return(
                <View style={{backgroundColor: '#FFF', width: wp(24), height: hp(20), justifyContent:'center', margin: wp(0.4), borderWidth: (0.1), borderColor:'#303030'}}>
                    <Text style={{fontSize: wp(20), textAlign:'center'}}>{item}</Text>
                </View>
            )
        }else{
            return(
                <TouchableOpacity disabled={openSecondCardIndex != -1} onPress={()=>{onCardPress(item, index)}}>
                    <View style={{backgroundColor: '#303030', width: wp(24), height: hp(20), margin: wp(0.4), borderWidth: (0.1), borderColor:'#303030'}}>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    const HeaderComponent = () =>{
        return(
            <View>

            </View>
        )
    }

    const FooterComponent = () =>{
        return(
            <View style={{flexDirection:'row', justifyContent:'space-between', padding: wp(5)}}>
                <View style={{alignItems:'center'}}>
                    <Text>MATCHES</Text>
                    <Text>{pairedCardList.length}</Text>
                </View>
                <TouchableOpacity onPress={()=>{restart()}}>
                    <View style={{backgroundColor:'#303030', paddingVertical: wp(2), paddingHorizontal: wp(4), borderRadius:4}}>
                        <Text style={{fontWeight:'bold', color:'#FFF'}}>RESTART</Text>
                    </View>
                </TouchableOpacity>
                <View style={{alignItems:'center'}}>
                    <Text>TURNS</Text>
                    <Text>{numberOfAttempt}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{width: wp(100), height: hp(100)}}>
            <FlatList
                ListHeaderComponent={<HeaderComponent />}
                showsVerticalScrollIndicator={false}
                data={cardList}
                keyExtractor={keyExtractor}
                numColumns={4}
                renderItem={renderCards}
                ListFooterComponent={<FooterComponent />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        alignItems: "center",
        justifyContent: "center"
    }

})
