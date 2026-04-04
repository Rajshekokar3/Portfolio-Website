const projectsData = [
  {
    id: 1,
    title: "Quarterly Financial Performance Analysis",
    description: "Evaluated Q3 margins, identifying a 15% drop in operational efficiency. Suggested cost-cutting strategies.",
    category: "excel",
    image: "/assets/images/project_excel.png",
    tags: ["Excel", "Financial Modeling"],
    insight: "Found $120k in redundant Q3 software expenses.",
    linkCode: "https://github.com/Rajshekokar3",
    excelUrl: "https://view.officeapps.live.com/op/embed.aspx?src=https://go.microsoft.com/fwlink/?LinkID=521962" // Example MS mock doc
  },
  {
    id: 2,
    title: "Stock Price Prediction Model",
    description: "Built a Time Series Forecasting model using ARIMA to predict short term movements in tech stocks.",
    category: "python",
    image: "/assets/images/project_python.png",
    tags: ["Python", "Pandas", "NumPy"],
    insight: "Achieved 82% directional accuracy over 30 days.",
    linkCode: "https://github.com/Rajshekokar3",
    excelUrl: null
  },
  {
    id: 3,
    title: "Corporate Valuation Dashboard",
    description: "DCF analysis dashboard for an acquisition target, visualizing WACC and terminal value scenarios.",
    category: "powerbi",
    image: "/assets/images/project_dashboard.png",
    tags: ["Power BI", "Valuation", "SQL"],
    insight: "Visualized multi-scenario EBITDA multiples seamlessly.",
    linkCode: "https://github.com/Rajshekokar3",
    excelUrl: null
  }
];

document.addEventListener('DOMContentLoaded', () => {
  
  // Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');
  
  // Check local storage
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      icon.classList.replace('fa-sun', 'fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  });

  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Render Projects
  const projectsGrid = document.getElementById('projects-grid');
  
  function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';
    
    const filtered = projectsData.filter(p => filter === 'all' || p.category === filter);
    
    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      
      const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
      
      let buttonsHtml = '';
      if(project.excelUrl) {
        buttonsHtml += `<button class="btn btn-primary" onclick="openExcelPreview('${project.excelUrl}')">Preview Project</button>`;
      }
      buttonsHtml += `<a href="${project.linkCode}" target="_blank" class="btn btn-secondary"><i class="fa-brands fa-github"></i> View Code</a>`;

      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-img">
        <div class="project-tags">${tagsHtml}</div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-insight"><strong>Insight:</strong> ${project.insight}</div>
        <div class="project-actions">
          ${buttonsHtml}
        </div>
      `;
      projectsGrid.appendChild(card);
    });
  }

  // Initial render
  renderProjects('all');

  // Filter logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  // Excel Modal Logic
  const modal = document.getElementById('excelModal');
  const closeModalBtn = document.getElementById('closeModal');
  const iframeContainer = document.getElementById('iframeContainer');

  window.openExcelPreview = function(url) {
    iframeContainer.innerHTML = `<iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>`;
    modal.classList.add('active');
  };

  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => { iframeContainer.innerHTML = ''; }, 300); // clear after animation
  });

  // Close modal on outside click
  modal.addEventListener('click', (e) => {
    if(e.target === modal) {
      modal.classList.remove('active');
      setTimeout(() => { iframeContainer.innerHTML = ''; }, 300);
    }
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

});
