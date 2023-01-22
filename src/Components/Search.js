import {useState} from 'react'

function Search(props){
  
  const [searchText, setSearchText]=useState('');
  
  
  function searchList() {
    props.getFilteredData(searchText);
  }

  const handleClick= e=>{
    
    setSearchText(e.target.value);
    console.log("serac  text is ", searchText);
  }

  return(
  <div class="search">
  	<i class="fa fa-search" aria-hidden="true"></i>
    <input type="search" placeholder="Search here" onChange={handleClick}/>
    {searchList()}
  </div>
  )
}
export default Search;