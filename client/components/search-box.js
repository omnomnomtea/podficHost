import React from 'react'

const SearchBox = (props) => {
  const {fandoms, pairings, characters, tags} = props;
  if (!fandoms || !pairings || !characters || !tags){
    return <div className="loading search-container" />
  }

  return (
    <div className="search-container">
      <h4>Search and Filter</h4>
      <form>
        <select>
          <h5>Fandoms</h5>
            {
              fandoms.map(fandom =>
              <option key={fandom.id} value={fandom.id}>{fandom.name}</option>)
            }
        </select>
        <h5>Tags</h5>
        <select>
          {
            tags.map(tag =>
            <option key={tag.id} value={tag.id}>{tag.name}</option>)
          }
        </select>
        <button>Search/Filter</button>
      </form>
    </div>
  )
}

export default SearchBox;
