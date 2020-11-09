import React, { useState, useEffect } from "react";
import Select from "react-select";

import config from "../../config.json";

import "./SearchCatForm.css";

const imageTypes = ["jpg", "png", "gif"].map(v => ({ value: v, label: v }));
const apiKey = config.apiKey;
const baseUrl = "https://api.thecatapi.com/v1";

function SearchCatForm({ excludedCats, addCats, limit }) {
    const loading = false;
    const selectedCats = [];

    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedImageTypes, setSelectedTimageTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cats, setCats] = useState([]);

    // Fetch categories
    useEffect(() => {
        fetch(`${baseUrl}/categories`)
            .then(response => response.json())
            .then(categories =>
                categories.map(({ name, id }) => ({ value: id, label: name }))
            )
            .then(setCategories);
    }, [setCategories]);

    // Fetch images at start and when category/images types are updated
    useEffect(() => {
        const imageTypes = selectedImageTypes.map(t => t.value);
        const headers = new Headers();
        headers.append("x-api-key", apiKey);
        fetch(
            `${baseUrl}/images/search?limit=${limit}&category_ids=${
            selectedCategory ? selectedCategory.value : ""
            }&mime_types=${imageTypes.join(",")}`
        )
            .then(response => response.json())
            .then(setCats);
    }, [setCats, selectedCategory, selectedImageTypes, limit]);

    return <div className="SearchCatForm">
        <Select
            placeholder="Category"
            className="SearchCatForm-select"
            options={categories}
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
