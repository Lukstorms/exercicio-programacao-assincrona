const { listarPokemons, detalharPokemon } = require('utils-playground')

const listar = async (req, res) => {
    const listagem = await listarPokemons()
    return res.status(200).json(listagem)
}

const detalhar = async (req, res) => {
    const { idOuNome } = req.params

    const { id, name, height, weight, base_experience, forms, abilities, species } = await detalharPokemon(idOuNome)
    const pokemonDetalhado = {
        id,
        name,
        height,
        weight,
        base_experience,
        forms,
        abilities,
        species
    }


    return res.status(200).json(pokemonDetalhado)

}


module.exports = {
    listar,
    detalhar
}