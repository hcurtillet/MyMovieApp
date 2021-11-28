import { createStackNavigator, createAppContainer } from 'react-navigation-stack'
import Search from '../components/Search'

const SearchStackNavigation = createStackNavigator(
    {
        screen: Search,
        navigationOptions:{
            title: "Search"
        }
    }
)
export default createAppContainer(SearchStackNavigation)