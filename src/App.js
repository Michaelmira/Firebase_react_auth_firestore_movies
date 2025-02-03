import { useState, useEffect } from 'react';
import './App.css';
import { Auth } from './componets/auth.js';
import { db } from './config/firebase.js';
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies")

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState("");

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("")
  
  useEffect(() => {
    getMovieList()
  }, [] )

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData=data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id
      }));
      setMovieList(filteredData)
      console.log(filteredData)
    } catch (err) {
      console.error(err)
    }
  }

  const onSubmitMovie = async () => {
    try{
      await addDoc(moviesCollectionRef,{
        title: newMovieTitle, 
        releaseDate: newReleaseDate, 
        recievedAnOscar: isNewMovieOscar 
      });
      getMovieList()
    } catch (err) {
      console.error(err)
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id )
    await deleteDoc(movieDoc)
    getMovieList()
  }
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id )
    await deleteDoc(movieDoc)
    getMovieList()
  }
  
  return (
    <div className="App">
      <Auth />

      <div>
        <input 
          placeholder="Movie Title..." 
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input 
          placeholder="Release Date..." 
          type="number" 
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input 
          type="checkbox" 
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label> Recieved and Oscar </label>
        <button onClick={onSubmitMovie} > Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <label>Release Date: {movie.releaseDate} </label>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input 
              placeholder="newTitle..."/>
            <button> Update Title </button>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default App;
