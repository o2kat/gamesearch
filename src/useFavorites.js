import { useState, useEffect } from "react";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const addToFavorites = (game) => {
        const updatedFavorites = [...favorites, game];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter((game) => game.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return { favorites, addToFavorites, removeFromFavorites };
};