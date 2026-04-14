const blogPosts = [
  {
    id: 1,
    category: "Tutorial",
    icon: "💻",
    title: "Introduction to HTML for Beginners",
    shortText: "Learn the basic structure of a web page using simple HTML tags and examples.",
    fullText:
      "HTML stands for HyperText Markup Language. It is used to create the structure of web pages. With HTML, you can add headings, paragraphs, images, links, forms, tables and much more. Every beginner should start by understanding tags like html, head, body, h1, p, a, img and div. HTML is the foundation of web development."
  },
  {
    id: 2,
    category: "Tutorial",
    icon: "🎨",
    title: "CSS Basics for Attractive Web Design",
    shortText: "Learn colors, fonts, spacing, flexbox, grid, hover effects and responsive design.",
    fullText:
      "CSS stands for Cascading Style Sheets. It is used to style HTML elements. With CSS, you can change colors, fonts, margins, padding, borders and layouts. You can also create responsive websites using media queries. Beginners should learn selectors, classes, ids, box model, flexbox, grid, transitions and hover effects."
  },
  {
    id: 3,
    category: "Project",
    icon: "🌦️",
    title: "How to Make a Weather App Using HTML, CSS and JavaScript",
    shortText: "Create a weather app with search, temperature, humidity and wind details.",
    fullText:
      "A weather app is a great project for beginners. You can design the interface using HTML and CSS, then fetch weather data using JavaScript and a weather API. This project teaches API integration, DOM manipulation, event handling and responsive UI design. It is a strong mini project for students."
  },
  {
    id: 4,
    category: "Project",
    icon: "✅",
    title: "Build a To-Do List Using JavaScript",
    shortText: "Understand DOM, events, arrays and localStorage through a simple task app.",
    fullText:
      "A to-do list project helps you learn how JavaScript interacts with HTML. You can add tasks, delete them, mark them complete and save them using localStorage. This is a practical project to understand event listeners, arrays, condition checking and UI updates."
  },
  {
    id: 5,
    category: "Error Solve",
    icon: "⚠️",
    title: "How to Fix TemplateSyntaxError in Django",
    shortText: "Understand why Django template syntax errors happen and how to solve them.",
    fullText:
      "TemplateSyntaxError usually happens when template syntax is incorrect. For example, {% student.id %} is wrong for variables, while {{ student.id }} is correct. Use {{ }} for variables and {% %} for template logic such as loops and conditions. Also check closing tags, spelling and spacing carefully."
  },
  {
    id: 6,
    category: "Error Solve",
    icon: "🛠️",
    title: "Why CSS Is Not Linking Properly",
    shortText: "Common mistakes in file path, href, static folders and browser cache.",
    fullText:
      "If CSS is not applying, first check if the stylesheet path is correct. In HTML projects, verify the filename and folder structure. In Django, make sure you use {% load static %} and correct static paths. Also, clear browser cache or use Ctrl + F5 to refresh. File names are case-sensitive in many environments."
  },
  {
    id: 7,
    category: "Tips",
    icon: "✨",
    title: "Best Tips to Make Your Mini Project Attractive",
    shortText: "Use clean layout, good colors, proper spacing, cards, shadows and responsiveness.",
    fullText:
      "To make your mini project attractive, use a clean and organized layout. Choose a modern color palette, readable fonts, enough spacing, rounded cards, shadows and hover effects. Keep the website responsive and user-friendly. Add useful features like search, dark mode and interactive buttons to impress your teacher."
  },
  {
    id: 8,
    category: "Tips",
    icon: "📘",
    title: "GitHub Tips Every Beginner Should Know",
    shortText: "Learn how to upload projects, write README files and manage repositories.",
    fullText:
      "GitHub is very important for students and developers. Every beginner should know how to create a repository, upload files, commit changes, push code and write a proper README. A good GitHub profile can help you showcase your projects and skills to teachers, recruiters and interviewers."
  },
  {
    id: 9,
    category: "Project",
    icon: "🧮",
    title: "Calculator Project Using HTML CSS and JavaScript",
    shortText: "A simple and useful project to practice buttons, logic and calculations.",
    fullText:
      "A calculator project is perfect for beginners because it improves your understanding of UI structure, button events and logic building. You can create number buttons, operator buttons and a display screen using HTML, CSS and JavaScript. This project strengthens problem solving and DOM manipulation."
  },
  {
    id: 10,
    category: "Tutorial",
    icon: "🗂️",
    title: "JavaScript Events Explained in Simple Words",
    shortText: "Learn onclick, input, submit, mouse events and how they work in web pages.",
    fullText:
      "JavaScript events are actions that happen in the browser, like clicking a button, typing in a field or submitting a form. Common events include onclick, onmouseover, oninput and submit. Events allow you to make websites interactive. They are very important in building real projects."
  }
];

let selectedCategory = "All";
let currentPostId = null;

const blogContainer = document.getElementById("blogContainer");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const noPost = document.getElementById("noPost");

const modal = document.getElementById("postModal");
const closeModal = document.getElementById("closeModal");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalLikeBtn = document.getElementById("modalLikeBtn");

const commentInput = document.getElementById("commentInput");
const addCommentBtn = document.getElementById("addCommentBtn");
const commentList = document.getElementById("commentList");

const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function getLikes() {
  return JSON.parse(localStorage.getItem("blogLikes")) || {};
}

function saveLikes(likes) {
  localStorage.setItem("blogLikes", JSON.stringify(likes));
}

function getComments() {
  return JSON.parse(localStorage.getItem("blogComments")) || {};
}

function saveComments(comments) {
  localStorage.setItem("blogComments", JSON.stringify(comments));
}

function renderPosts() {
  if (!blogContainer || !searchInput || !noPost) return;

  const searchText = searchInput.value.toLowerCase().trim();
  const likes = getLikes();

  const filteredPosts = blogPosts.filter((post) => {
    const matchCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    const matchSearch =
      post.title.toLowerCase().includes(searchText) ||
      post.shortText.toLowerCase().includes(searchText) ||
      post.category.toLowerCase().includes(searchText);

    return matchCategory && matchSearch;
  });

  blogContainer.innerHTML = "";

  if (filteredPosts.length === 0) {
    noPost.style.display = "block";
    return;
  }

  noPost.style.display = "none";

  filteredPosts.forEach((post) => {
    const likeCount = likes[post.id] || 0;
    const card = document.createElement("div");
    card.className = "blog-card";

    card.innerHTML = `
      <div class="blog-image">${post.icon}</div>
      <div class="blog-content">
        <span class="blog-tag">${post.category}</span>
        <h3>${post.title}</h3>
        <p>${post.shortText}</p>
        <div class="blog-actions">
          <button class="read-btn" onclick="openPost(${post.id})">Read More</button>
          <button class="like-btn" onclick="likePost(${post.id})">❤️ ${likeCount}</button>
        </div>
      </div>
    `;

    blogContainer.appendChild(card);
  });
}

function likePost(id) {
  const likes = getLikes();
  likes[id] = (likes[id] || 0) + 1;
  saveLikes(likes);
  renderPosts();

  if (currentPostId === id) {
    updateModalLike();
  }
}

function openPost(id) {
  if (!modal || !modalCategory || !modalTitle || !modalText) return;

  const post = blogPosts.find((item) => item.id === id);
  if (!post) return;

  currentPostId = id;
  modalCategory.textContent = post.category;
  modalTitle.textContent = post.title;
  modalText.textContent = post.fullText;

  updateModalLike();
  renderComments();
  modal.style.display = "flex";
}

function updateModalLike() {
  if (!modalLikeBtn) return;
  const likes = getLikes();
  const count = likes[currentPostId] || 0;
  modalLikeBtn.textContent = `❤️ ${count}`;
}

function renderComments() {
  if (!commentList) return;

  const comments = getComments();
  const postComments = comments[currentPostId] || [];
  commentList.innerHTML = "";

  if (postComments.length === 0) {
    commentList.innerHTML = `<div class="comment-item">No comments yet. Be the first to comment.</div>`;
    return;
  }

  postComments.forEach((comment) => {
    const div = document.createElement("div");
    div.className = "comment-item";
    div.textContent = comment;
    commentList.appendChild(div);
  });
}

if (modalLikeBtn) {
  modalLikeBtn.addEventListener("click", () => {
    if (currentPostId !== null) {
      likePost(currentPostId);
    }
  });
}

if (addCommentBtn) {
  addCommentBtn.addEventListener("click", () => {
    if (!commentInput) return;
    const text = commentInput.value.trim();
    if (text === "" || currentPostId === null) return;

    const comments = getComments();
    if (!comments[currentPostId]) {
      comments[currentPostId] = [];
    }

    comments[currentPostId].push(text);
    saveComments(comments);
    commentInput.value = "";
    renderComments();
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    if (modal) modal.style.display = "none";
    if (commentInput) commentInput.value = "";
  });
}

if (modal) {
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      if (commentInput) commentInput.value = "";
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    const link = button.dataset.link;

    if (link && category !== "All") {
      window.location.href = link;
      return;
    }

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = category || "All";
    renderPosts();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", renderPosts);
}

if (clearSearch) {
  clearSearch.addEventListener("click", () => {
    if (!searchInput) return;
    searchInput.value = "";
    renderPosts();
  });
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    if (themeToggle) themeToggle.textContent = "🌙";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}

loadTheme();
renderPosts();
