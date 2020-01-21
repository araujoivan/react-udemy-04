import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductsDetailScreen';
// OrdersScreen is not part of the stack ... so lets put it  into draw
import OrdersScreen from '../screens/shop/OrderScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const defaultNavOptions = {
    headerStyle:  {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' :  Colors.primary,
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    }
};

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen
    }, 
    { 
        navigationOptions: {
            drawerLabel: 'Products',
            drawerIcon: drawerConfig => 
            <Ionicons name={ Platform.OS === 'android' ? 'md-card' : 'ios-card'}
                size={23}
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen
    }, 
    {
        navigationOptions: {
            drawerLabel: 'My Orders',
            drawerIcon: drawerConfig => 
            <Ionicons name={ Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions
    }
)

const ShopDrawerNavigator = createDrawerNavigator(
    {
        ProductsDrawer: ProductsNavigator,
        OrdersDrawer: OrdersNavigator
    }, 
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
)

export default createAppContainer(ShopDrawerNavigator);