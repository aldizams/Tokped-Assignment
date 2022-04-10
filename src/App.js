import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';
import { Header } from './components';
import { Routes, Route, Link } from 'react-router-dom';
import { Detail, Home, MyPokemon } from './pages';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/detail/:name" element={<Detail />} />
				<Route path="/my-pokemon" element={<MyPokemon />} />
			</Routes>
		</>
	);
}
export default App;
