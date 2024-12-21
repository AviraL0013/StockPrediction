import React, { createContext, useContext, useState } from "react";
const SearchContext=createContext()
export const useSearch=()=>useContext(SearchContext)
export const SearchProvider=({children})=>{
    const[query,setQuery]=useState('')
    const[symbol,setSymbol]=useState('')
return(
<SearchContext.Provider value={{ query, setQuery, symbol, setSymbol }}>
{children}
</SearchContext.Provider>
);
}; 