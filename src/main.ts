import App from "./App.vue";
import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import { useBlogStore } from "./store/root";

import { Amplify } from "aws-amplify";
import aws_exports from "./aws-exports";

import { API } from "aws-amplify";
import * as queries from "./graphql/queries";
import type { ListBlogsQuery } from "./API";
import type { GraphQLQuery } from "@aws-amplify/api";

import { router } from "./router";

import type { RouteRecordRaw } from "vue-router";

import "./assets/main.css";
Amplify.configure(aws_exports);

export const createApp = ViteSSG(
  App,
  { routes: router },
  async ({ initialState, app, router }) => {
    const pinia = createPinia();
    app.use(pinia);
    if (import.meta.env.SSR) {
      const { data } = await API.graphql<GraphQLQuery<ListBlogsQuery>>({
        query: queries.listBlogs
      });
      initialState.data = data;
    } else {
      // Restore or read the initial state on the client side in the browser
      const store = useBlogStore();
      store.posts = initialState.data || {};
      store.getPosts();
    }
  }
);
export async function includedRoutes(
  paths: string[],
  routes: RouteRecordRaw[]
) {
  try {
    const { data } = await API.graphql<GraphQLQuery<ListBlogsQuery>>({
      query: queries.listBlogs
    });
    const items = data?.listBlogs?.items.map((item) => `/blog${item?.slug}`);
    return (
      await Promise.all(
        routes.map(async (route) => {
          return route.name === "blog" ? items : route.path;
        })
      )
    ).flat();
  } catch (error) {
    console.log("error", error);
  }
}
