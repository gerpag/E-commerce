const Search = () => {
  // comento evento por las dudas, que cuente como funcionalidad
  //const handleSearch = (event) => {
  // event.preventDefault();}; ---> en form: onSubmit={handleSearch}

  return (
    <>
      <form>
        <button href="/search" className="flex justify-center">
          <input
            type="text"
            placeholder="Buscar productos"
            className="block text-l mt-4 lg:inline-block lg:mt-0 font-bold text-black bg-transparent focus:outline-none focus:border-blue-500 border-2 border-transparent placeholder-black placeholder-opacity-50 p-2 mr-10"
          />
        </button>
      </form>
    </>
  );
};

export default Search;
