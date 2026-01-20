import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';

try {
  // Ensure CNAME file exists in dist
  if (!existsSync('./dist/CNAME')) {
    writeFileSync('./dist/CNAME', 'rdybmiharbi.my');
    console.log('✅ Created CNAME file');
  }

  // Initialize git in dist folder and push to gh-pages
  console.log('📦 Deploying to GitHub Pages...');
  
  execSync('cd dist && git init', { stdio: 'inherit' });
  execSync('cd dist && git add -A', { stdio: 'inherit' });
  execSync('cd dist && git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
  execSync('cd dist && git branch -M gh-pages', { stdio: 'inherit' });
  execSync('cd dist && git remote add origin https://github.com/rdybmiharbi/rdybmiharbi.github.io.git', { stdio: 'ignore' });
  execSync('cd dist && git push -f origin gh-pages', { stdio: 'inherit' });
  
  console.log('✅ Deployed successfully to GitHub Pages!');
  console.log('🌐 Your site will be available at: https://rdybmiharbi.my');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}