import React from 'react';

interface SearchBarPropsType {
    onChange: (e) => void;
    placeholder: string;
}

const SearchBar: React.FC<SearchBarPropsType> = ({ onChange, placeholder }) => {

    return (
        <input className="form-control" type="text"onChange={onChange} placeholder={placeholder} />
    )
}

export default SearchBar;