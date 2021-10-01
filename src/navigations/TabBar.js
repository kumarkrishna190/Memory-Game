import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TabIcon from './TabIcon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const TabBar = (props) => {
    const {state, descriptors} = props
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    
    return (
        <View style={styles.bar}>
            {state.routes.map((route, index) => <TabButton key={index} {...props} route={route} index={index}/>)}
        </View>
    )
}

const TabButton = ({state, descriptors, navigation, route, index, onSelect}) => {
    const { options } = descriptors[route.key];
    const { tabBarAccessibilityLabel, tabBarTestID } = options;
    
    const isFocused = state.index === index;
    const accState = isFocused ? { selected: true } : {}

    const label = (options.tabBarLabel !== undefined) ? options.tabBarLabel : (options.title !== undefined) ? options.title : route.name;

    const onPress = () => {
        const event = navigation.emit({type: 'tabPress', target: route.key, canPreventDefault: true});
        if (!isFocused && !event.defaultPrevented && route.name !== "Add") {
          navigation.navigate(route.name);
        }
    }

    return(
        <View >
            <View style={{height:hp(0.6),width:wp(16),borderRadius:50,alignSelf:'center',backgroundColor: isFocused ? '#ED635E' : 'transparent'}} />
            <TouchableOpacity style={styles.tab} onPress={onPress} accessibilityRole="button" accessibilityState={accState} accessibilityLabel={tabBarAccessibilityLabel} testID={tabBarTestID}>
                <TabIcon route={route} color={isFocused ? '#FF5757' : '#B9BDC1'} focused={isFocused}/>
                <Text style={[styles.label, { color: isFocused ? '#FF5757' : '#B9BDC1' }]}>{label.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bar:{
        width: '100%',
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    tab: {
        width: wp(25),
        height: 70,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabbar: {
      alignItems: 'center',
    },
    label: {
        position: 'absolute',
        fontSize: 11,
        height: 16,
        lineHeight: 16,
        bottom: 15
    },
});

export default TabBar;