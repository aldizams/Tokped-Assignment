import React from 'react';

const MyPokemon = () => {
	const myPokemon = localStorage.getItem('MyPokemon');
	console.log(myPokemon);
	return <div>MyPokemon</div>;
};

export default MyPokemon;
