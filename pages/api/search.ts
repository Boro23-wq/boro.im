import { NextApiRequest, NextApiResponse } from "next";
import FuzzySearch from "fuzzy-search";
import { getSortedPostsData } from "@/lib/posts";

// Load posts data
const posts =
  process.env.NODE_ENV === "production"
    ? require("../../cache/blog-posts").posts
    : getSortedPostsData();

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Extract the query parameter
  const query = (req.query.q as string)?.toLowerCase() || "";

  // Create a fuzzy search instance
  const searcher = new FuzzySearch(posts, ["title"], {
    caseSensitive: false, // Change this based on your needs
    sort: true, // Optional: sort results by best match
  });

  // Perform the search
  const results = searcher.search(query);

  // Send the response
  res.status(200).json({ results });
};
