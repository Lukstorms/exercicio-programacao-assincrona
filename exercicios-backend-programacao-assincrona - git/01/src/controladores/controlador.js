const produtos = require('../bancodedados/produtos');
const { getStateFromZipcode } = require('utils-playground')

const listarProdutos = (req, res) => {
    return res.json(produtos);
};

const detalharProduto = (req, res) => {
    const { idProduto } = req.params;
    const produtoLocalizado = produtos.find((produto) => {
        return produto.id === Number(idProduto)
    });

    const produtoNLocalizado = produtos.find((produto) => {
        return produto.id !== Number(idProduto)
    });

    if (produtoLocalizado) {
        return res.status(200).json(produtoLocalizado);
    } else if (produtoNLocalizado) {
        return res.status(400).json({ mensagem: "Não existe produto para o ID especificado." });
    }
};

const valorDoFrete = async (req, res) => {
    const { idProduto, cep } = req.params;

    const produtoLocalizado = produtos.find((produto) => {
        return produto.id === Number(idProduto)
    });

    const produtoNLocalizado = produtos.find((produto) => {
        return produto.id !== Number(idProduto)
    });

    const endereco = await getStateFromZipcode(cep)


    const desconto = ['BA', 'SE', 'AL', 'PE', 'PB']

    const maisCaro = ['SP', 'RJ']

    if (produtoLocalizado) {
        if (endereco === desconto) {
            const valor = produtoLocalizado.valor * (10 / 100)
            return res.status(200).json({ produtoLocalizado, valor })
        } else if (endereco === maisCaro) {
            const valor = produtoLocalizado.valor * (15 / 100)
            return res.status(200).json({ produtoLocalizado, valor })
        } else {
            const valor = produtoLocalizado.valor * (12 / 100)
            return res.status(200).json({ produtoLocalizado, valor })
        }
    } else if (produtoNLocalizado) {
        return res.status(400).json({ mensagem: "Não existe produto para o ID especificado." });
    }


};

module.exports = {
    listarProdutos,
    detalharProduto,
    valorDoFrete
}