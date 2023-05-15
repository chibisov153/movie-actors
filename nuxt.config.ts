// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    baseURL: 'https://xopc333.github.io/',
    head: {
      link: [
        { rel: "stylesheet", href: "app.css" },
        { rel: "icon", type: "image/png", href: "favicon/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "favicon/apple-touch-icon-180x180.png"
        }
      ]
    }
  },
  // runtimeConfig: {
  //   public: {
  //     apiBase: '/movie-actors'
  //   }
  // },
  // generate: {
  //   baseURL: '/movie-actors'
  // },
  //baseURL: '/movie-actors',
  // buildAssetsDir: '/movie-actors',
  // rootDir: '/movie-actors'


});
