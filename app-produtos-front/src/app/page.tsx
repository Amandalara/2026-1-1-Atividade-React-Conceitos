"use client";

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api";

export default function Home() {
  const [produtos, atualizarProdutos] = useState([]); // o useState cria uma variável que pode mudar ao longo do tempo
  const [busca, setBusca] = useState("");  //cria uma variável dinâmica (busca) e uma função pra mudar ela

  const produtosFiltrados =
  busca.trim() === "" //trim() remove espaços vazios do começo e do fim de uma string
    ? []
    : produtos.filter((produto) => //caso o usuário digite algo, é filtrado com o que combina com a busca
        produto.title.toLowerCase().includes(busca.toLowerCase())
      );

  useEffect(() => {
    getProdutosTodos()
      .then((resultado) => {
        atualizarProdutos(resultado.data.products);
      })
      .catch((erro) => {
        console.error("Erro ao buscar produtos:", erro);
      });
  }, []);

  return (
    <div style={{
      padding: "20px",
    }}>
      <header style={{
        paddingBottom: "15px", 
      }}>
        <h1 style={{
            fontSize: "25px",
          }}>Qual produto você deseja hoje?</h1>
        <input
          type="text"
          placeholder="Digite o nome do produto"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            padding: "10px",
            backgroundColor: "lightblue",
            borderRadius: "5px",
          }}
        />
      </header>
      <main>
  <h2>Resultados da busca:</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", 
      gap: "15px",
    }}
  >
    {produtosFiltrados.map((produto) => (
      <div
        key={produto.id}
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "10px",
          fontSize: "14px", // 
        }}
      >
        <img
          src={produto.images?.[0]}
          alt={produto.title}
          style={{
            width: "100%",
            height: "140px", // 
            borderRadius: "10px",
          }}
        />

        <h4 style={{ margin: "6px 0" }}>{produto.title}</h4>

        <p style={{ fontSize: "12px", color: "#555" }}>
          {produto.description.slice(0, 60)}...
        </p>
        <p style={{ fontSize: "18px", color: "#000000" }}>
          {produto.price}
        </p>

      </div>
    ))}
  </div>
</main>
    </div>
  );
}