<template>
  <div class="post-view">
    <template v-if="post">
      <article class="post-article">
        <h1 class="post-title">{{ post.title }}</h1>
        <time v-if="post.date" :datetime="post.date" class="post-date">
          {{ formatDate(post.date) }}
        </time>
        <div v-if="post.categories && post.categories.length" class="post-cats">
          <span v-for="c in post.categories" :key="c" class="post-cat-badge">{{ c }}</span>
        </div>
        <div class="post-body" v-html="postBody" />
      </article>
    </template>
    <div v-else class="post-not-found">
      <p>Post not found.</p>
      <router-link :to="{ name: 'Blog' }">Back to blog</router-link>
    </div>
  </div>
</template>

<script>
import { manifest, bodies } from '@/data/posts-data.js';

export default {
  name: 'Post',
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  computed: {
    post() {
      return manifest.find((p) => p.slug === this.slug) || null;
    },
    postBody() {
      if (!this.post || !bodies[this.post.slug]) return '';
      return bodies[this.post.slug];
    },
  },
  watch: {
    slug: {
      immediate: true,
      handler(slug) {
        const found = manifest.some((p) => p.slug === slug);
        if (!found && manifest.length) {
          this.$router.replace({ name: 'Blog' });
        }
      },
    },
  },
  methods: {
    formatDate(iso) {
      if (!iso) return '';
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    },
  },
};
</script>

<style lang="less" scoped>
.post-view {
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
}

.post-article {
  margin-bottom: 2rem;
}

.post-title {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  color: #2c3e50;
}

.post-date {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.post-cats {
  margin-bottom: 1rem;
}

.post-cat-badge {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  font-size: 0.75rem;
  background: #eee;
  border-radius: 3px;
  margin-right: 0.25rem;
}

.post-body {
  line-height: 1.6;

  ::v-deep p {
    margin: 0 0 0.75rem;
  }

  ::v-deep h2 {
    margin: 1.25rem 0 0.5rem;
    font-size: 1.2rem;
  }

  ::v-deep ul,
  ::v-deep ol {
    margin: 0 0 0.75rem;
    padding-left: 1.5rem;
  }

  ::v-deep code {
    background: #f5f5f5;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
  }
}

.post-not-found {
  color: #666;

  a {
    color: #42b983;
  }
}
</style>
