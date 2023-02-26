import { defineStore } from "pinia";
import type { ListBlogsQuery } from "../API";
import { API } from "@aws-amplify/api";
import * as queries from "../graphql/queries";
import type { GraphQLQuery } from "@aws-amplify/api";

export const useBlogStore = defineStore("counter", {
  state: () => ({
    posts: {} as ListBlogsQuery
  }),
  getters: {
    postPaths: (state) =>
      state.posts.listBlogs?.items.map((post) => `/blog${post?.slug}`)
  },
  actions: {
    async getPosts() {
      try {
        const { data } = await API.graphql<GraphQLQuery<ListBlogsQuery>>({
          query: queries.listBlogs
        });
        this.posts = { listBlogs: data?.listBlogs };
      } catch (error) {
        console.log("error", error);
      }
    }
  }
});
