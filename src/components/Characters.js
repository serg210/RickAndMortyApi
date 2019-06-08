import React from "react";

// import  {getCharacters}  from "./components/Api";
import  {getCharacters}  from "./Api";

import  Search  from "./Search";

import  Character  from "./Character";

import  Pagination  from "./Pagination";

import  Loader  from "./Loader";

import "../style/style.css";

class Characters extends React.Component {
    state = {
        name: "",
        gender: "",
        species: "",
        characters: [],
        page: 1,
        isLoaded: false
    };

    async componentDidMount() {
        const list = await getCharacters();

        this.setState({
            characters: list.results,
            pages: list.info.pages,
            isLoaded: true
        });
    }

    handlePaginationClick = event => {
        const clickedPageNumber = +event.target.textContent;

        this.setState(
            {
                isLoaded: false,
                page: clickedPageNumber
            },
            async () => {
                const list = await this.fetchCharacters();

                this.setState({
                    characters: list.results,
                    pages: list.info.pages,
                    isLoaded: true
                });
            }
        );
    };

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        this.setState(
            {
                isLoaded: false,
                page: 1
            },
            async () => {
                const list = await this.fetchCharacters();

                this.setState({
                    characters: list.results,
                    pages: list.info.pages,
                    isLoaded: true
                });
            }
        );
    };

    fetchCharacters = () =>
        getCharacters({
            name: this.state.name,
            gender: this.state.gender,
            species: this.state.species,
            page: this.state.page
        });

    render() {
        const {
            characters,
            isLoaded,
            name,
            page,
            pages
        } = this.state;

        return (
            <div>
                <Loader isLoaded={isLoaded}>
                    <Search
                        handleSubmit={this.handleFormSubmit}
                        handleChange={this.handleInputChange}
                        searchValue={name}
                    />
                    <div className="characters characters-background">
                        {characters.map(character => (
                            <Character
                                key={character.id}
                                imageSrc={character.image}
                                name={character.name}
                                species={character.species}
                                gender={character.gender}
                            />
                        ))}
                    </div>
                    <Pagination
                        handleClick={this.handlePaginationClick}
                        currentPage={page}
                        pages={pages}
                    />
                </Loader>
            </div>
        );
    }
}

export default Characters;
