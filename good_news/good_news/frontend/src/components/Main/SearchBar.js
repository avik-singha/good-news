import React, { useState } from 'react';

const SearchBar = (params) =>{
  const [textField, setTextField] = useState("");

  const handleChange = (e) => {
    setTextField(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    params.addItem(textField);
    setTextField("");
  }

  return (
    <form onSubmit={handleSubmit} className="input-group my-3">
      <input
        type="text"
        onChange={handleChange}
        value={textField}
        name="textField"
        className="form-control"
        placeholder="Search News..."
        aria-label="Add text here..."
      />
      <button type="submit" className="btn btn-primary ml-2">
        Submit
      </button>
    </form>
  );
}

export default SearchBar;