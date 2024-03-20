"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { getAllCategories } from '@/lib/api';

const CategoriesContext = createContext([]);

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState([]);  
    type CategoryData = {
      id: string;
      name: string;
      // Add other category properties as needed
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const allCategories = await getAllCategories();
            setCategories(allCategories);
        };

        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => useContext(CategoriesContext);