const redditUrl = 'https://www.reddit.com/r/javascript.json';
const jobSearchUrl = 'https://remoteok.io/api?ref=producthunt&tag=javascript';
const gitReposURl = 'https://api.github.com/search/repositories?q=javascript';
const gitIssuesURL = 'https://api.github.com/search/issues?q=javascript';

const redditPostsEl = document.getElementById('reddit-posts');
const jobsSearchEl = document.getElementById('js-searches');
const githubReposEl = document.getElementById('github-repos');
const githubIssuesEl = document.getElementById('github-issues');
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
  const jobs = await res.json();

  jobs.slice(1).map((job) => {
    const { apply_url, position } = job;
    jobsSearchEl.innerHTML += `
      <li><a href=${apply_url}>${position}</a></li>`;
  });
}
fetchJobs();

const reposEl = document.getElementById('repos-text');
const issuesEl = document.getElementById('issues-text');
const icon1 = document.getElementById('icon-1');
const icon2 = document.getElementById('icon-2');
const rightTitle = document.getElementById('repos-issues');

reposEl.addEventListener('click', () => {
  icon2.classList.remove('fa-chevron-up');
  icon1.classList.add('fa-chevron-up');
  githubReposEl.style.display = 'block';
  githubIssuesEl.style.display = 'none';
  rightTitle.textContent = 'Repositories';
});
issuesEl.addEventListener('click', () => {
  icon1.classList.remove('fa-chevron-up');
  icon2.classList.add('fa-chevron-up');
  githubReposEl.style.display = 'none';
  githubIssuesEl.style.display = 'block';
  rightTitle.textContent = 'Issues';
});

async function fetchGitRepos() {
  const res = await fetch(gitReposURl);
  const reposItems = await res.json();
  const repos = reposItems.items;
  repos.map((repo) => {
    const { full_name, html_url, open_issues } = repo;
    githubReposEl.innerHTML += `
      <li class='repos-list__list-item'>
      <a href='${html_url}'>
      <p class='list-item__repo'>Repo: ${full_name}</p>
      <p class='list-item__issues'>Issue: #${open_issues}</p>
      <a class='list-item__repo-link' href='${html_url}'>Link to Repository</a>
      </a>
      </li>`;
  });
}

fetchGitRepos();

async function fetchGitIssues() {
  const res = await fetch(gitIssuesURL);
  const issuesItems = await res.json();
  const issues = issuesItems.items;
  issues.map((issue) => {
    const user = issue.user.login;
    const { html_url, title } = issue;
    githubIssuesEl.innerHTML += `
      <li class='repos-list__list-item'>
      <a href='${html_url}'>
      <p class='list-item__repo'>Issue: ${title}}</p>
      <p class='list-item__issues'>User: ${user}</p>
      <a class='list-item__repo-link' href='${html_url}'>Link to Repository</a>
      </a>
      </li>`;
  });
}
fetchGitIssues();
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
