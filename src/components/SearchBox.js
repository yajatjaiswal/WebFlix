import React from "react";

function SearchBox(props) {
  const reset = (e) => {
    console.log(e.target.value, "vvvvvvvvvvvvvv");
    console.log(e.target.value.length, "vvvvvvvvvvvvvv");
    console.log("---------x----------");
    // console.log('---------x----------')
    if (e.target.value.length === 0) {
      window.location.reload(false);
    }
  };

  return (
    <div className="col col-sm-4">
      <div>
        <input
          className="form-control"
          value={props.value}
          onKeyUp={reset}
          onChange={(event) => props.setSearchValue(event.target.value)}
          placeholder="Type to search..."
          autoFocus
        ></input>
      </div>
    </div>
  );
}

export default SearchBox;
