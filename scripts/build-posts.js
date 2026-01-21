import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { glob } from 'glob';

const postsSourceDir = './posts';
const outputDir = './src/blog';
const jsonOutputDir = './public/blog';
const templatePath = './templates/post-template.html';

// Create directories if they don't exist
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}
if (!existsSync(jsonOutputDir)) {
  mkdirSync(jsonOutputDir, { recursive: true });
}

// Read all markdown files
const postFiles = glob.sync(`${postsSourceDir}/**/*.md`);

const posts = [];

const postTemplate = readFileSync(templatePath, 'utf-8');

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
    image: data.image || '/blog/images/placeholder.jpg',
    content: html,
    readTime: Math.ceil(markdownContent.split(' ').length / 200) + ' min read',
  };
  
  posts.push(post);
  
  // Create individual post HTML file in src/blog/ for Vite to process
  const postHtml = postTemplate
    .replace(/{{TITLE}}/g, post.title)
    .replace(/{{DATE}}/g, post.date)
    .replace(/{{CATEGORY}}/g, post.category)
    .replace(/{{READ_TIME}}/g, post.readTime)
    .replace(/{{CONTENT}}/g, post.content)
    .replace(/{{IMAGE}}/g, post.image);
  
  writeFileSync(`${outputDir}/${slug}.html`, postHtml);
});

// Sort posts by date (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Generate posts.json for blog listing in public/blog/
writeFileSync(
  `${jsonOutputDir}/posts.json`,
  JSON.stringify(posts, null, 2)
);

console.log(`✅ Processed ${posts.length} blog posts into ${outputDir} and ${jsonOutputDir}`);
