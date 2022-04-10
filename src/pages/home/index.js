import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONLIST } from '../../graphql/queries';
import { Card, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
	const [offsetValue, setOffsetValue] = useState(0);
	const { loading, error, data, refetch } = useQuery(GET_POKEMONLIST, {
		variables: { limit: 52, offset: 0 },
	});
	// const GET_NAME = () => {
	// 	useNavigate('../detail', { state: { name: data.pokemons.results.name } });
	// };

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :</p>;
	return (
		<>
			<Container fluid="sm">
				<div className="PokeList">
					{data.pokemons.results.map((item, index) => (
						<>
							<Card style={{ width: '18rem', marginTop: '10px' }} key={index}>
								<div className="PokeArt">
									<Card.Img
										variant="top"
										src={item.artwork}
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
										{item.name.toUpperCase()[0] + item.name.slice(1)}
									</Card.Title>
									<Link to={`/detail/${item.name}`}>
										<Button
											variant="primary"
											// onClick={() => {
											// 	GET_NAME();
											// }}
										>
											Detail
										</Button>
									</Link>
								</Card.Body>
							</Card>
						</>
					))}
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-evenly',
						alignContent: 'center',
						marginTop: '10px',
					}}
				>
					<Button
						variant="primary"
						onClick={() => {
							setOffsetValue(offsetValue - 50);
							refetch({ offset: offsetValue });
						}}
						disabled={offsetValue === 0 ? true : false}
					>
						Prev
					</Button>{' '}
					<Button
						variant="primary"
						onClick={() => {
							setOffsetValue(offsetValue + 50);
							refetch({ offset: offsetValue });
						}}
					>
						Next
					</Button>{' '}
				</div>
			</Container>
		</>
	);
};
export default Home;
