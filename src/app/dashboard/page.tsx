"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/nav-bar";

export default function DashboardPage() {
    const [stock, setStock] = useState(null);
    const [symbol, setSymbol] = useState("AAPL");
    const [search, setSearch] = useState("");

    const fetchStockData = async (stockSymbol) => {
        try {
            const response = await fetch(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=SUA_API_KEY`
            );
            const data = await response.json();

            if (data["Global Quote"]) {
                const quote = data["Global Quote"];
                setStock({
                    name: stockSymbol,
                    price: quote["05. price"],
                    change: `${quote["09. change"]} (${quote["10. change percent"]})`,
                    marketCap: "-", // Alpha Vantage não fornece market cap diretamente
                    sharesOutstanding: "-", // Alpha Vantage não fornece diretamente
                });
            } else {
                setStock(null);
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            setStock(null);
        }
    };

    useEffect(() => {
        fetchStockData(symbol); // Busca inicial
        const interval = setInterval(() => fetchStockData(symbol), 5000); // Atualiza a cada 5 segundos

        return () => clearInterval(interval);
    }, [symbol]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            setSymbol(search.trim().toUpperCase());
            setSearch("");
        }
    };

    return (
        <>
            <NavBar active="dashboard" />

            <main className="items-center min-h-screen">
                <div className="bg-slate-900 max-w-4x1 w-full p-6 rounded m-6 text-center">
                    <h2 className="text-lg font-bold mb-6 text-white">Dashboard</h2>

                    {/* Barra de pesquisa */}
                    <form onSubmit={handleSearch} className="flex justify-center mb-6">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Digite o código da ação (ex: AAPL)"
                            className="px-4 py-2 rounded-l bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-r"
                        >
                            Buscar
                        </button>
                    </form>

                    {/* Tabela de ações */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-slate-800 text-white rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="py-2 px-4">Nome</th>
                                    <th className="py-2 px-4">Preço</th>
                                    <th className="py-2 px-4">Mudança</th>
                                    <th className="py-2 px-4">Capitalização de Mercado</th>
                                    <th className="py-2 px-4">Ações em Circulação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stock ? (
                                    <tr className="even:bg-slate-700 odd:bg-slate-600">
                                        <td className="py-2 px-4">{stock.name}</td>
                                        <td className="py-2 px-4">${stock.price}</td>
                                        <td className={`py-2 px-4 ${parseFloat(stock.change) >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            {stock.change}
                                        </td>
                                        <td className="py-2 px-4">{stock.marketCap}</td>
                                        <td className="py-2 px-4">{stock.sharesOutstanding}</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-4 text-center text-red-400">
                                            Nenhum dado encontrado para "{symbol}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}