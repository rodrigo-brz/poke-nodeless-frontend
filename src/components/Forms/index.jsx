import React, { useState, useEffect } from "react";
import axios from "../../utils/api";
import { toast } from "react-toastify";
import {
  Form,
  Button,
  Card,
  CardColumns,
  Row,
  Col,
  Container,
} from "react-bootstrap";

import typeColors from "../../helpers/typeColors";
import "./style.css";

export default function MyForm() {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemon, setPokemon] = useState();
  const [pokemonTeam, setPokemonTeam] = useState([]);

  const handleSubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    try {
      const response = await axios.get(`/dev/get-one-pokemon/${searchPokemon}`);
      console.log(response.data);
      setPokemon(response.data);
      toast.info("A wild Pokemon appears!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await axios.get(`/dev/get-team-pokemon/0`);
      setPokemonTeam(response.data.pokemons);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const onChange = ({ target: { value } }) => {
    setSearchPokemon(value);
  };

  return (
    <>
      <div>
        <Form className="mb-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicSearch">
            <Form.Control
              size="lg"
              type="text"
              value={searchPokemon}
              onChange={onChange}
              placeholder="Enter name of Pokemon you want"
            />
          </Form.Group>
          <Button
            disabled={!searchPokemon.trim()}
            variant="danger"
            type="submit"
          >
            Search
          </Button>
        </Form>
      </div>

      <div>
        {pokemon ? (
          <Card bg="dark" text="white">
            <Card.Header>
              <Card.Title>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Container>
                <Row>
                  <Col sm={4}>
                    <Card.Img
                      variant="top"
                      src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                      style={{ width: "16rem" }}
                    />
                  </Col>
                  <Col sm={3}>
                    <Card.Text>
                      ID: #{pokemon.id}
                      <br />
                      Height: {pokemon.height / 10} m
                      <br />
                      Weight: {pokemon.weight / 10} kg
                      <br />
                      Ability:
                      {" " +
                        pokemon.ability.charAt(0).toUpperCase() +
                        pokemon.ability.slice(1)}
                      <br />
                      Type:
                      <div class="Card_types">
                        {pokemon.type.map((type) => {
                          return (
                            <div
                              mb={4}
                              className="Card__type"
                              style={{
                                backgroundColor: typeColors[type],
                              }}
                            >
                              {type}
                            </div>
                          );
                        })}
                      </div>
                    </Card.Text>
                  </Col>
                  <Col sm={3}>
                    <Card.Text>
                      Base Stats
                      <br />
                      HP: {pokemon.stats[0]}
                      <br />
                      Attack: {pokemon.stats[1]}
                      <br />
                      Defense: {pokemon.stats[2]}
                      <br />
                      Special Attack: {pokemon.stats[3]}
                      <br />
                      Special Defense: {pokemon.stats[4]}
                      <br />
                      Speed: {pokemon.stats[5]}
                    </Card.Text>
                  </Col>
                  <Col sm={2}>
                    <div>Your Team:</div>
                    <Col sm={6}>
                      <CardColumns>
                        <Card bg="danger">
                          {pokemonTeam[0] ? (
                            <Card.Img
                              variant="top"
                              src={pokemonTeam[0].sprite}
                              style={{ width: "16rem" }}
                            />
                          ) : (
                            <Card.Text>Abacate</Card.Text>
                          )}
                        </Card>
                      </CardColumns>
                    </Col>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Header>
              <Card.Title>Selected Pokemon</Card.Title>
            </Card.Header>
            <Card.Body>Agua</Card.Body>
          </Card>
        )}
      </div>
    </>
  );
}
