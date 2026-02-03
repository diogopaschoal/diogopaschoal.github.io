<template>
  <div class="blog">
    <div class="blog-layout">
      <aside class="blog-list-panel">
        <h2 class="blog-list-title">Posts</h2>
        <div v-if="categories.length" class="blog-categories">
          <button type="button" class="blog-category-pill" :class="{ active: !categoryFilter }"
            @click="categoryFilter = null">
            All
          </button>
          <button v-for="cat in categories" :key="cat" type="button" class="blog-category-pill"
            :class="{ active: categoryFilter === cat }" @click="categoryFilter = cat">
            {{ cat }}
          </button>
        </div>
        <ul class="blog-list">
          <li v-for="post in filteredPosts" :key="post.slug" class="blog-list-item"
            :class="{ selected: post.slug === selectedSlug }">
            <router-link :to="{ name: 'Blog', query: { post: post.slug } }" class="blog-list-link"
              @click.prevent="selectPost(post.slug)">
              <span class="blog-list-item-title">{{ post.title }}</span>
              <span v-if="post.date" class="blog-list-item-date">{{ formatDate(post.date) }}</span>
              <span v-if="post.categories && post.categories.length" class="blog-list-item-cats">
                <span v-for="c in post.categories" :key="c" class="blog-cat-badge">{{ c }}</span>
              </span>
            </router-link>
          </li>
        </ul>
      </aside>
      <main class="blog-article-panel">
        <template v-if="selectedPost">
          <article class="blog-article">
            <h1 class="blog-article-title">{{ selectedPost.title }}</h1>
            <time v-if="selectedPost.date" :datetime="selectedPost.date" class="blog-article-date">
              {{ formatDate(selectedPost.date) }}
            </time>
            <div v-if="selectedPost.categories && selectedPost.categories.length" class="blog-article-cats">
              <span v-for="c in selectedPost.categories" :key="c" class="blog-cat-badge">{{ c }}</span>
            </div>
            <div class="blog-article-body" v-html="selectedPostBody" />
          </article>
        </template>
        <p v-else class="blog-empty">Select a post or add posts to <code>content/posts/</code>.</p>
      </main>
    </div>
  </div>
</template>

<script>
import { manifest, bodies } from '@/data/posts-data.js';

export default {
  name: 'Blog',
  data() {
    return {
      posts: manifest,
      bodies,
      selectedSlug: null,
      categoryFilter: null,
    };
  },
  computed: {
    filteredPosts() {
      if (!this.categoryFilter) return this.posts;
      return this.posts.filter((p) => p.categories && p.categories.includes(this.categoryFilter));
    },
    categories() {
      const set = new Set();
      this.posts.forEach((p) => {
        if (p.categories) p.categories.forEach((c) => set.add(c));
      });
      return [...set].sort();
    },
    selectedPost() {
      if (!this.selectedSlug) return null;
      return this.posts.find((p) => p.slug === this.selectedSlug) || null;
    },
    selectedPostBody() {
      if (!this.selectedSlug || !this.bodies[this.selectedSlug]) return '';
      return this.bodies[this.selectedSlug];
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        const slug = route.query.post;
        const valid = slug && this.posts.some((p) => p.slug === slug);
        if (valid) {
          this.selectedSlug = slug;
        } else if (this.posts.length) {
          this.selectedSlug = this.posts[0].slug;
          this.syncUrl();
        } else {
          this.selectedSlug = null;
        }
      },
    },
  },
  mounted() {
    if (this.posts.length && this.selectedSlug === null) {
      this.selectedSlug = this.posts[0].slug;
      this.syncUrl();
    }
  },
  methods: {
    selectPost(slug) {
      this.selectedSlug = slug;
      this.syncUrl();
    },
    syncUrl() {
      this.$router.replace({
        name: 'Blog',
        query: this.selectedSlug ? { post: this.selectedSlug } : {},
      });
    },
    formatDate(iso) {
      if (!iso) return '';
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    },
  },
};
</script>

<style lang="less" scoped>
.blog {
  text-align: left;
  max-width: 100%;
}

.blog-layout {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  min-height: 60vh;
}

.blog-list-panel {
  flex: 0 0 30%;
  min-width: 220px;
  padding: 1rem 1.5rem 1rem 1rem;
  border-right: 1px solid #e0e0e0;
}

.blog-list-title {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  color: #2c3e50;
}

.blog-categories {
  margin-bottom: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.blog-category-pill {
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  color: #2c3e50;
  cursor: pointer;

  &.active {
    background: #14BED9;
    border-color: #14BED9;
    color: #fff;
  }
}

.blog-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.blog-list-item {
  margin-bottom: 0.25rem;

  &.selected .blog-list-link {
    color: #14BED9;
    font-weight: bold;
  }
}

.blog-list-link {
  display: block;
  padding: 0.4rem 0;
  color: #2c3e50;
  text-decoration: none;

  &:hover {
    color: #14BED9;
  }
}

.blog-list-item-title {
  display: block;
  font-size: 0.95rem;
}

.blog-list-item-date {
  display: block;
  font-size: 0.8rem;
  color: #666;
}

.blog-list-item-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.2rem;
}

.blog-article-panel {
  flex: 1 0 70%;
  min-width: 280px;
  padding: 1rem 2rem 2rem 1.5rem;
}

.blog-article-title {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: #2c3e50;
}

.blog-article-date {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.blog-article-cats {
  margin-bottom: 1rem;
}

.blog-cat-badge {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  font-size: 0.75rem;
  background: #eee;
  border-radius: 3px;
  margin-right: 0.25rem;
}

.blog-article-body {
  margin-top: 1rem;
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

.blog-empty {
  color: #666;
}

@media (max-width: 768px) {
  .blog-layout {
    flex-direction: column;
  }

  .blog-list-panel {
    flex: none;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
}
</style>
