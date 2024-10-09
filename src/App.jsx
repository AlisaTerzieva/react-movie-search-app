import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { MovieList } from './MovieList.jsx';
import { MovieDetails } from './MovieDetails.jsx';


function App() {
  return <>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MovieList />}/>
				<Route path="/details/:id" element={<MovieDetails/>}/>
			</Routes>
		</BrowserRouter>
  </>
}

export default App;
