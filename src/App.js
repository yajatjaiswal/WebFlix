import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToFavourites from './components/AddToFavourites';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import Login2 from './components/Login/Login2';
// import useToken from './components/useToken';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  // const {token,setToken}=useToken();
  
  const [movies, setMovies] = useState([]);
  const [searchValue,setSearchValue]=useState('');
  const [favourites,setFavourites]=useState([]);
  const [fav,setFav]=useState(false); 
  
  const resetForm=()=>{
    
  }
  // const {movieTicket,setMovieTicket}=UseMovieToken();
  
  
  async function getMovieRequest(searchValue){
    const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=fce6452a`;
    const response=await fetch(url);
    const responseJson=await response.json();
    
    if (responseJson.Search){
      setMovies(responseJson.Search);
    }
  };
  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue])
 
  
  // useEffect(()=>{
  //   const movieFavourites=JSON.parse(
  //     localStorage.getItem('react-movie-app-favourites')
  //   );
  //   setFavourites(movieFavourites);
  // },[]);
  
  // const saveToLocalStorage=(items)=>{
  //     localStorage.setItem('react-movie-app-favourites',JSON.stringify(items));
  //   } 
    
    const addFavouriteMovie=(movie)=>{      
      const newFavouriteList=[...favourites,movie];
      setFavourites(newFavouriteList);
      // saveToLocalStorage(newFavouriteList);
      // if(movie.imdbID)
      // {
      //   setFav(true)
      //   setFavourites(newFavouriteList);
      //   console.log(newFavouriteList.includes(movie.imdbID),"-------Fav--------");
      // }
      // else{
      //   alert("Alredy Added..!!");
      //     }      
    };
    
    const removeFavouritesMovie=(movie)=>{
      const newFavouriteList=favourites.filter(
        (favourite)=>favourite.imdbID!==movie.imdbID
        );
        setFavourites(newFavouriteList);
      // saveToLocalStorage(newFavouriteList);        
      }
      

      // if(!token){
      //   return <Login2 setToken={setToken}/>
      // }

      
      return (

        <div className='container-fluid movie-app'>

      <BrowserRouter>
      <Switch>
        <Route path="/yajatjaiswal/WebFlix">

        <h1>Search Movies here</h1>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>        
        <div><input type='reset' value='Reset Form' onClick={() => window.location.reload(false)}/></div>
          {/* <Dashboard /> */}
          <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
      </div>
      <div className='mainContainer'>

      <div className='row'>
          <MovieList movies={movies} 
          favouriteComponent={AddToFavourites}
          handleFavouritesClick={addFavouriteMovie}
          />
      </div>
        </div>
      <div className='row'>
        <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
        <MovieList movies={favourites}
        handleFavouritesClick={removeFavouritesMovie}
        favouriteComponent={RemoveFavourites}/>
      </div>
        

        </Route>
        {/* <Route path="/favourite">
          <div className='mainContainer'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieLi
        +
        stHeading heading='Favourites'/>
      </div>

        <div className='row'>
          <h2>sef</h2>
        <MovieList movies={favourites}
        handleFavouritesClick={removeFavouritesMovie}
        favouriteComponent={RemoveFavourites}/>
      </div>
        </div>
      <div><h1>efdfd</h1></div>
         
        </Route> */}
      </Switch>
    </BrowserRouter>
 

    </div>
  );
}

export default App;
