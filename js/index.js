const redditUrl = 'https://www.reddit.com/r/javascript.json';
const jobSearchUrl = 'https://remotive.io/api/remote-jobs?search=front%20end';
const jsReposURl = 'https://api.github.com/search/repositories?q=javascript';

const redditPostsEl = document.getElementById('reddit-posts');
const jobsSearchEl = document.getElementById('js-searches');
const githubReposEl = document.getElementById('github-repos');
const timeEl = document.getElementById('timer-container');

async function fetchRedditFeeds() {
  const res = await fetch(redditUrl);
  const data = await res.json();

  const posts = data.data.children;

  posts.slice(1).map((post) => {
    const title = post.data.title;
    const author = post.data.author;
    const score = post.data.ups;
    const url = post.data.url;
    const link = 'https://www.reddit.com' + post.data.permalink;
    redditPostsEl.innerHTML += `
      <li class='post-list__link-container'>  
        <a href=${url} >
         <p class="post-list__title">${title}</p>
         <p  class="post-list__author">Posted by: <span>u/${author}</span></p>
         <p  class="post-list__score">Reddit Score: ${score}</p>
         <a  class="post-list__link" href=${link}>Links to Comments</a>
        </a>
      </li>
`;
  });

  return data;
}
fetchRedditFeeds();

async function fetchJobs() {
  const res = await fetch(jobSearchUrl);
  const data = await res.json();
  const jobs = data.jobs;
  jobs.map((job) => {
    const { url, title } = job;
    jobsSearchEl.innerHTML += `
    <li><a href=${url}>${title}</a></li>`;
    return data;
  });
}
fetchJobs();

async function fetchJsRepos() {
  const res = await fetch(jsReposURl);
  const items = await res.json();
  const repos = items.items;

  repos.map((repo) => {
    const { full_name, git_url, open_issues } = repo;
    githubReposEl.innerHTML += `
    <li class='repos-list__list-item'>
    <p class='list-item__repo'>Repo: ${full_name}</p>
    <p class='list-item__issues'>Issue: ${open_issues}</p>
    <a class='list-item__repo-link' href='${git_url}'>Link</a>
    </li>`;
  });
}
fetchJsRepos();

setInterval(function formatAMPM() {
  const date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  const todayDate =
    date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  const monthDay = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
  });
  const year = date.toLocaleString('en-US', {
    year: 'numeric',
  });
  timeEl.innerHTML = `
  <h1 class="buttom-section__time">${
    hours + ':' + minutes
  }<span>${ampm}</span></h1>
  <p class="buttom-section__date">${monthDay},${year}</p>`;
}, 1000);
