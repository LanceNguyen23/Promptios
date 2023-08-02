"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setFilterPosts(data);
    };

    fetchPosts();
  }, []);

  const handleChangeText = (e) => {
    // check search by clicking tag or by search bar
    const text = typeof(e) === "string" ? e : e.target.value;

    setSearchText(text);

    let newPosts = posts.filter(
      (post) =>
        post.prompt.includes(text) ||
        post.tag.includes(text) ||
        post.creator.username.includes(text)
    );
    setFilterPosts(newPosts);
  };

  const handleTagClick = (tag) => {
    handleChangeText(tag)
  }

  return (
    <section className="feed">
      <form action="" className="relative w-full">
        <input
          type="text"
          placeholder="Search for prompt, a tag or a username"
          value={searchText}
          onChange={handleChangeText}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filterPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
