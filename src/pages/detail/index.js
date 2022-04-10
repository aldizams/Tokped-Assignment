import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON, GET_POKEMONLIST } from "../../graphql/queries";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Accordion, Badge } from "react-bootstrap";
import swal from "sweetalert";

const Detail = () => {
    const {
        loading: pokeLoading,
        error: pokeError,
        data: pokeData,
    } = useQuery(GET_POKEMONLIST, {
        variables: { limit: 1126, offset: 0 },
    });
    const params = useParams();
    const { loading, error, data } = useQuery(GET_POKEMON, {
        variables: { name: params.name },
    });
    const MyPokemons = JSON.parse(localStorage.getItem("MyPokemon")) || [];

    const allPokemons = pokeData?.pokemons?.results || [];

    const imagePokemon = allPokemons.filter(
        (item) => item.name === params.name
    );

    const catchPokemon = () => {
        const percentage = Math.floor(Math.random() * 100) + 1;
        if (percentage < 50) {
            swal({
                text: "Failed to catch",
                icon: "error",
            });
        } else {
            swal({
                text: "Success to catch",
                icon: "success",
            });
            MyPokemons.push({
                name: data.pokemon.name,
                id: data.pokemon.id,
                image: imagePokemon[0].artwork,
            });
            localStorage.setItem("MyPokemon", JSON.stringify(MyPokemons));
        }
    };

    if (loading || pokeLoading) return <p>Loading...</p>;
    if (error || pokeError) return <p>Error :</p>;
    return (
        <>
            <div>
                <div className="PokeArt">
                    <Card.Img
                        variant="top"
                        src={imagePokemon[0].artwork}
                        style={{ width: "40%", height: "40%" }}
                    />
                </div>
                <h3>{data.pokemon.name}</h3>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Move</Accordion.Header>
                                <Accordion.Body>
                                    {data.pokemon.moves.map((item, index) => (
                                        <Badge
                                            bg="light"
                                            text="dark"
                                            className="m-1"
                                            key={index}
                                            style={{
                                                border: "1px solid #212529",
                                            }}
                                        >
                                            {item.move.name}
                                        </Badge>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card>
                </Accordion>
                <Button variant="primary" onClick={() => catchPokemon()}>
                    Catch
                </Button>{" "}
                <Link to="/">
                    <Button variant="danger">Back</Button>
                </Link>
            </div>
        </>
    );
};

export default Detail;
