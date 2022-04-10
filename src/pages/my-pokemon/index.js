import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import swal from 'sweetalert';

const MyPokemon = () => {
	const [reload, setReload] = useState(false);
	let myPokemon = JSON.parse(localStorage.getItem('MyPokemon')) || [];

	useEffect(() => {
		myPokemon = JSON.parse(localStorage.getItem('MyPokemon')) || [];
		setReload(false);
	}, [reload]);

	const releasePokemon = (data) => {
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this Pokemon',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				swal('Your pokemon has been released!', {
					icon: 'success',
				});
				const findPokemonName = myPokemon.findIndex(
					(item) => item.name === data.name
				);
				console.log(findPokemonName);
				if (findPokemonName > -1) {
					myPokemon.splice(findPokemonName, 1);
				}
				localStorage.setItem('MyPokemon', JSON.stringify(myPokemon));
				setReload(true);
			}
		});
	};
	return (
		<div>
			{myPokemon.map((data) => (
				<>
					<Card style={{ width: '18rem', marginTop: '10px' }} key={data.id}>
						<div className="PokeArt">
							<Card.Img
								variant="top"
								src={data.artwork}
								style={{ width: '40%', height: '40%' }}
							/>
						</div>
						<Card.Body
							style={{
								position: 'flex',
								justifyContent: 'center',
								alignSelf: 'center',
							}}
						>
							<Card.Title style={{ textAlign: 'center' }}>
								{data.name.toUpperCase()[0] + data.name.slice(1)}
							</Card.Title>

							<Button
								variant="primary"
								onClick={() => {
									releasePokemon(data);
								}}
							>
								Release
							</Button>
						</Card.Body>
					</Card>
				</>
			))}
		</div>
	);
};

export default MyPokemon;
