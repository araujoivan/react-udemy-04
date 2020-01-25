import React from  'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cardActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductOverviewScreen = props => {

    // state.products <- this key is defined int the App.js rootReducer
    // products.availableproducts <- this key is defined in the reducers\product.js initialState
    const products = useSelector(state => state.products.availableProducts);

    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        })
    } 

    return (<FlatList 
                data={products} 
                keyExtractor={item => item.id} 
                renderItem={itemData => 
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                >
                    <Button 
                        color={Colors.primary} 
                        title="View Details" 
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }} 
                    ></Button>
                    <Button 
                        color={Colors.primary} 
                        title="To Cart"  
                        onPress={() => {
                            dispatch(cardActions.addToCart(itemData.item))
                        }} 
                    ></Button>
                </ProductItem>}
            />);
}

ProductOverviewScreen.navigationOptions = navData =>  {
    return {
        headerTitle: 'Products',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title="Menu"
                            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                            onPress={() => {
                                navData.navigation.toggleDrawer();
                            }}
                        />
                     </HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title="Cart"
                            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-card'}
                            onPress={() => {
                                navData.navigation.navigate('Cart');
                            }}
                        />
                     </HeaderButtons>)
    }
}

export default ProductOverviewScreen