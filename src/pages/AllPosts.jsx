import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import appwriteServicec from "../appwrite/curr";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const fetchCurrentUser = async () => {
    try {
      const currentUser = await appwriteServicec.getCurrentUser();
      if (!currentUser) {
        throw new Error("User is not authenticated");
      } else {
        console.log("User is authenticated:", currentUser);
      }
    } catch (error) {
      console.error("Error checking authenticationeeeeeeeeeeeeeee:", error);
    }
  };
  useEffect(() => {
    // Fetch posts
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    // Check if the current user is authenticated

    fetchCurrentUser();
  }, []); //

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
