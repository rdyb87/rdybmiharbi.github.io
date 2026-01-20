import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { glob } from 'glob';

const postsDir = './src/posts';
const outputDir = './src/generated';

// Create output directory if it doesn't exist
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Read all markdown files
const postFiles = glob.sync(`${postsDir}/**/*.md`);

const posts = [];

postFiles.forEach(filePath => {
  const content = readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);
  
  const slug = basename(filePath, '.md');
  const html = marked(markdownContent);
  
  const post = {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    excerpt: data.excerpt || '',
    category: data.category || 'Uncategorized',
    image: data.image || '/images/default-post.jpg',
    content: html,
    readTime: Math.ceil(markdownContent.split(' ').length / 200) + ' min read',
  };
  
  posts.push(post);
  
  // Create individual post HTML file
  const postTemplate = readFileSync('./src/post-template.html', 'utf-8');
  const postHtml = postTemplate
    .replace('{{TITLE}}', post.title)
    .replace('{{DATE}}', post.date)
    .replace('{{CATEGORY}}', post.category)
    .replace('{{READ_TIME}}', post.readTime)
    .replace('{{CONTENT}}', post.content)
    .replace('{{IMAGE}}', post.image);
  
  writeFileSync(`./src/blog/${slug}.html`, postHtml);
});

// Sort posts by date (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Generate posts.json for blog listing
writeFileSync(
  `${outputDir}/posts.json`,
  JSON.stringify(posts, null, 2)
);

console.log(`✅ Processed ${posts.length} blog posts`);