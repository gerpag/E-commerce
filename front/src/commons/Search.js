const Search = () => {
  // comento evento por las dudas, que cuente como funcionalidad
  //const handleSearch = (event) => {
  // event.preventDefault();}; ---> en form: onSubmit={handleSearch}

  return (
    <>
      <form>
        <input type="text" placeholder="Search product..." />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
