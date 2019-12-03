import React from 'react'

const SearchComponent = (props) => {
    return ( 
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Rechercher .." onChange={handleSearch} value={search} />
        </div>
    );
}

export default SearchComponent;