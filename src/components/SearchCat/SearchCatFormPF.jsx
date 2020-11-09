import React from "react";
import Select from "react-select";


import "./SearchCatForm.css";

const imageTypes = ["jpg", "png", "gif"].map(v => ({ value: v, label: v }));

function SearchCatForm({ excludedCats, addCats, limit }) {
    const loading = false;
    const cats = [];
    const selectedCats = [];

    return <div className="SearchCatForm">
        <Select
            placeholder="Category"
            className="SearchCatForm-select"
        />
        <Select
            isMulti
            options={imageTypes}
            placeholder="Image type"
            className="SearchCatForm-select"
        />

        {loading ? (
            <span>Loading cats...</span>
        ) : (
                <div className="SearchCatForm-results">
                    {cats.map(cat => (
                        <img
                            alt=""
                            src={cat.url}
                            key={cat.id}
                            className={`${
                                selectedCats.includes(cat.id) ? "SearchCatForm-selected" : ""
                                }${
                                excludedCats.includes(cat.url) ? "SearchCatForm-excluded" : ""
                                }`}
                        />
                    ))}
                </div>
            )}
        {selectedCats.length > 0 && (
            <button
                className="SearchCatForm-submit"                
            >
                Add Cats
            </button>
        )}
    </div>
}

export default SearchCatForm;
