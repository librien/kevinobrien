<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <blog-posts :posts="posts"/>
    </v-col>
  </v-row>
</template>

<script>
import BlogPosts from '~/components/BlogPosts.vue';
export default {
  components: { BlogPosts },
  methods: {
    async getPosts() {
      const posts = await this.$axios.$get('https://gorillalogic.com/wp-json/wp/v2/posts')
      this.posts = posts
    }
  },
  mounted() {
    this.getPosts();
  }
}
</script>
