import Alpine from 'alpinejs';

// Make Alpine available globally
window.Alpine = Alpine;

// Navigation component
Alpine.data('navigation', () => ({
  mobileMenuOpen: false,
  
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  },
  
  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}));

// Blog listing component
Alpine.data('blogListing', () => ({
  posts: [],
  filteredPosts: [],
  selectedCategory: 'all',
  searchQuery: '',
  loading: true,
  
  async init() {
    try {
      const response = await fetch('/generated/posts.json');
      this.posts = await response.json();
      this.filteredPosts = this.posts;
      this.loading = false;
    } catch (error) {
      console.error('Error loading posts:', error);
      this.loading = false;
    }
  },
  
  get categories() {
    const cats = new Set(this.posts.map(p => p.category));
    return ['all', ...Array.from(cats)];
  },
  
  filterByCategory(category) {
    this.selectedCategory = category;
    this.applyFilters();
  },
  
  search() {
    this.applyFilters();
  },
  
  applyFilters() {
    let filtered = this.posts;
    
    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }
    
    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query)
      );
    }
    
    this.filteredPosts = filtered;
  }
}));

// Featured posts component for homepage
Alpine.data('featuredPosts', () => ({
  posts: [],
  loading: true,
  
  async init() {
    try {
      const response = await fetch('/generated/posts.json');
      const allPosts = await response.json();
      this.posts = allPosts.slice(0, 3); // Get latest 3 posts
      this.loading = false;
    } catch (error) {
      console.error('Error loading posts:', error);
      this.loading = false;
    }
  }
}));

// Scroll reveal animation
Alpine.data('scrollReveal', () => ({
  visible: false,
  
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visible = true;
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(this.$el);
  }
}));

// Start Alpine
Alpine.start();