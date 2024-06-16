'use client'
import Styles from "../../Components/page.module.css";
import { useState } from "react";

export default function SearchModel({ constData, SetConstData }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredData = constData.filter(item => item.split("/")[2].toLowerCase().includes(query));
    SetConstData(filteredData);
  };

  return (
    <>
      <div className={Styles.SearchModel}>
        <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
        <div className={Styles.searchBtn}>Search</div>
      </div>
    </>
  );
}
