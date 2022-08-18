import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg';

const api_url = 'http://www.omdbapi.com?apikey=d374f222'; // fetching movie data

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchterm] = useState('');

    const searchMovies = async (title) => {
            const response = await fetch(`${api_url}&s=${title}`);
            const data = await response.json();

            setMovies(data.Search);
        
    }

    useEffect(() => {
        searchMovies('random');
    }, []);

    return(
        <div className="app">
            <h1>Sasta Netflix</h1>
            
            <div className="search">
                <input 
                    placeholder="Search for movies" 
                    value={searchTerm}
                    onChange={(e) => setSearchterm(e.target.value)}
                />
                <img 
                    src= {SearchIcon} 
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0 
            ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie = {movie} />
                    ))}
                </div>

            )
            : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}

        </div>
    );
}

export default App;

