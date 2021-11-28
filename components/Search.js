import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicatorComponent, ActivityIndicator } from 'react-native';
import films from '../helpers/filmsData';
import FilmItem from './FilmItem';
import getFilmsFromApiWithSearchedText from '../API/TMDBApi';

class Search extends React.Component{

    constructor(props){
        super(props);
        this.page=0;
        this.totalPage=0;
        this.state = {
            films:[],
            searchTextInput:"",
            isLoading: false
        };
    }
    _loadFilm(){
        if(this.state.searchTextInput.length > 0){
            this.setState({isLoading: true});
            getFilmsFromApiWithSearchedText(this.state.searchTextInput, this.page+1).then(data => {
                this.page = data.page;
                this.totalPage = data.total_pages;
                this.setState({
                    films:[...this.state.films, ...data.results],
                    isLoading: false
                })
                this.forceUpdate();
            });
        }

    }

    _searchFilm(){
        this.setState({films:[]});
        this.page=0;
        this.totalPage=0;
        this._loadFilm();
    }

    _searchTextInput(text){
        this.setState({searchTextInput: text});
    }

    _displayLoading(){
        if(this.state.isLoading){
            return(
                <View sytle={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        };
    }
    render(){
        console.log(this.state.isLoading);
        return(
            <View style={styles.maincontainer}>
                <TextInput 
                    style={styles.textinput} 
                    placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInput(text)}
                    onSubmitEditing={() => this._searchFilm}  
                />
                <Button 
                    style={styles.button}
                    title='Rechercher' 
                    onPress={() => {this._searchFilm()}}
                />
                <FlatList 
                    data={this.state.films}
                    renderItem={({item}) => <FilmItem film={item}/>}
                    onEndReachedThreshold={1}
                    onEndReached={
                        () =>{
                            if(this.page < this.totalPage){
                                this._loadFilm();
                            }
                        }
                    }
                />
                {this._displayLoading()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer:{
        marginTop:40,
        flex:1,
        backgroundColor:"#00a0a0"
    },
    container1:{
        marginTop:10,
        borderColor:'red',
        borderWidth:2,
        backgroundColor:"#a0a000",
        flex:1
    },
    container2:{
        marginTop:0,
        borderColor:'red',
        borderWidth:2,
        backgroundColor:"#a0a000",
        flex:2
    },
    textinput:{
        marginLeft:20, 
        marginRight:20,
        height:50,
        borderColor:'#ff0000', 
        borderWidth:1, 
        paddingLeft:5
    },
    button:{
        marginLeft:40,
        backgroundColor:'red'
    },
    loading_container:{
        position: 'absolute',
        left:0,
        right:0,
        top: 100,
        bottom:0,
        alignItems:'center',
        justifyContent: 'center'
    }
    
});

export default Search;
