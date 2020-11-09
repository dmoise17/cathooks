import React, {useState} from "react";
import Select from "react-select";


import "./SearchCatForm.css";

const imageTypes = ["jpg", "png", "gif"].map(v => ({ value: v, label: v }));

function SearchCatForm({ excludedCats, addCats, limit }) {
    const loading = false;
    const cats = [];
    const selectedCats = [];

    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedImageTypes, setSelectedTimageTypes] = useState([]);

    return <div className="SearchCatForm">
        <Select
            placeholder="Category"
            className="SearchCatForm-select"
            value={selectedCategory}
            onChange={v => setSelectedCategory(v)}
        />
        <Select
            isMulti
            options={imageTypes}
            placeholder="Image type"
            className="SearchCatForm-select"
            value={selectedImageTypes}
            onChange={v => setSelectedTimageTypes(v)}
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
