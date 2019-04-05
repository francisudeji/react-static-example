import path from "path";
import axios from "axios";

export default {
  getRoutes: async () => {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return [
      {
        path: "/blog",
        template: "src/pages/blog",
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          template: "src/containers/Post",
          getData: () => ({
            post
          })
        }))
      },
      {
        path: "/",
        template: "src/pages/index"
      },
      {
        path: "/about",
        template: "src/pages/about"
      },
      {
        path: "*",
        template: "src/pages/404"
      }
    ];
  },
  plugins: [
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages")
      }
    ],
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap")
  ]
};
