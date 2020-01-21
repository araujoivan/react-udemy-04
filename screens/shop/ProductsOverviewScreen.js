import React from  'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cardActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

const ProductOverviewScreen = props => {

    // state.products <- this key is defined int the App.js rootReducer
    // products.availableproducts <- this key is defined in the reducers\product.js initialState
    const products = useSelector(state => state.products.availableProducts);

    const dispatch = useDispatch();

    return (<FlatList 
                data={products} 
                keyExtractor={item => item.id} 
                renderItem={itemData => 
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title
                        })
                    }}
                    onAddToCart={() => {
                        dispatch(cardActions.addToCart(itemData.item))
                    }}

                />}
            />);
}

ProductOverviewScreen.navigationOptions = navData =>  {
    return {
        headerTitle: 'Products',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title="Menu"
                            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                            onPress={() => {
                                navData.navigation.toggleDrawer();
                            }}
                        />
                     </HeaderButtons>),
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
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