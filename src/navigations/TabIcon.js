import React from 'react';
import { Image, View } from 'react-native';

const Icon = ({icon, size, float = false, color}) => {
    const style = {width: size, height: size, marginBottom: float ? 0 : 14, tintColor: color}
    return <Image resizeMode={'contain'} source={icon} style={style}/>
}

const TabIcon = ({route, color, focused}) => {
    switch(route.name){
        case 'ORDERS':
            return <Icon icon={focused ? require('../assets/bottomNavigation/WorkActive.png') : require('../assets/bottomNavigation/WorkInactive.png')} size={24} color={color}/>;
        case 'MY LISTINGS':
            return <Icon icon={focused ? require('../assets/bottomNavigation/ShopActive.png') : require('../assets/bottomNavigation/ShopInactive.png')} size={24} color={color}/>;
        case 'ALERTS':
            return <Icon icon={focused ? require('../assets/bottomNavigation/NotificationActive.png') : require('../assets/bottomNavigation/NotificationInactive.png')} size={24} color={color}/>;
        case 'PROFILE':
            return <Icon icon={focused ? require('../assets/bottomNavigation/activeAccount.png') : require('../assets/bottomNavigation/accountInactive.png')} size={24} color={color}/>;
        case 'PAYMENTS':
            return <Icon icon={focused ? require('../assets/bottomNavigation/RupeeActive.png') : require('../assets/bottomNavigation/RupeeInactive.png')} size={24} color={color}/>;
        default:
            return;
    }
};
  
export default TabIcon;