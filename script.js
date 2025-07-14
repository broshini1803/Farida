// ========== Smooth Scrolling for Navigation ==========
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// ========== Section Fade-in Animation ==========
const sections = document.querySelectorAll('section');
const fadeInOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('fade-in');
    }
  });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// ========== Navbar Shrink on Scroll ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('navbar-shrink');
  } else {
    navbar.classList.remove('navbar-shrink');
  }
});

// ========== Sustainability Card Carousel ==========
const sustainabilityCards = [
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    title: "Environmental & Social Initiatives",
    content: `<p>At Farida Group, sustainability is at the core of our operations. We are committed to reducing our environmental footprint through innovative manufacturing processes, renewable energy adoption, and waste reduction programs.</p>
      <p>Our social responsibility initiatives focus on community development, employee welfare, and supporting local economies through fair trade practices and ethical sourcing.</p>`,
    button: `<a href="#" class="btn btn-green" download>&#128190; Download Sustainability Report</a>`
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop",
    title: "Green Manufacturing",
    content: `<p>We invest in renewable energy, water recycling, and eco-friendly materials to minimize our environmental impact and promote a greener future.</p>`,
    button: ""
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
    title: "Community Engagement",
    content: `<p>Our outreach programs support local education, healthcare, and economic development, empowering communities around us.</p>`,
    button: ""
  }
];
let sustainabilityIndex = 0;
const sustainabilityCard = document.getElementById('sustainability-card');
const prevBtn = document.getElementById('sustainability-prev');
const nextBtn = document.getElementById('sustainability-next');
function renderSustainabilityCard(idx) {
  const card = sustainabilityCards[idx];
  sustainabilityCard.innerHTML = `
    <div class="sustainability-image">
      <img src="${card.image}" alt="${card.title}" />
    </div>
    <div class="sustainability-content">
      <h3>${card.title}</h3>
      ${card.content}
      ${card.button}
    </div>
  `;
}
if (sustainabilityCard && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    sustainabilityIndex = (sustainabilityIndex - 1 + sustainabilityCards.length) % sustainabilityCards.length;
    renderSustainabilityCard(sustainabilityIndex);
  });
  nextBtn.addEventListener('click', () => {
    sustainabilityIndex = (sustainabilityIndex + 1) % sustainabilityCards.length;
    renderSustainabilityCard(sustainabilityIndex);
  });
  renderSustainabilityCard(sustainabilityIndex);
}

// ========== Navbar Scroll Spy ==========
const sectionIds = [
  'home',
  'about',
  'management',
  'companies',
  'gallery',
  'sustainability',
  'news',
  'rewards',
  'contact'
];
const sectionsSpy = sectionIds.map(id => document.getElementById(id));
window.addEventListener('scroll', () => {
  let current = '';
  const scrollY = window.scrollY + 120;
  for (let i = 0; i < sectionsSpy.length; i++) {
    const section = sectionsSpy[i];
    if (section && section.offsetTop <= scrollY) {
      current = sectionIds[i];
    }
  }
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Footer color logic
  const footer = document.querySelector('.thin-footer');
  if (current === 'home' || !current) {
    footer.classList.remove('navy');
  } else {
    footer.classList.add('navy');
  }
});

// ========== Management Modal Logic ==========
const managementModal = document.getElementById('management-modal');
const managementModalBody = document.getElementById('management-modal-body');
const managementModalClose = document.getElementById('management-modal-close');
const managementModalOverlay = document.getElementById('management-modal-overlay');
const managementCards = document.querySelectorAll('.management-card');

function openManagementModal(card) {
  const name = card.getAttribute('data-name');
  const position = card.getAttribute('data-position');
  const img = card.getAttribute('data-img');
  const info = card.getAttribute('data-info');
  managementModalBody.innerHTML = `
    <img src="${img}" alt="${name}" />
    <h2>${name}</h2>
    <div class="designation">${position}</div>
    <div class="modal-info">${info}</div>
  `;
  managementModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeManagementModal() {
  managementModal.classList.remove('active');
  document.body.style.overflow = '';
}
managementCards.forEach(card => {
  card.addEventListener('click', () => openManagementModal(card));
});
managementModalClose.addEventListener('click', closeManagementModal);
managementModalOverlay.addEventListener('click', closeManagementModal);

// ========== Company Modal Logic ==========
document.addEventListener('DOMContentLoaded', function () {
    const companyCards = document.querySelectorAll('.company-card');
    const modal = document.getElementById('company-modal');
    const modalBody = document.getElementById('company-modal-body');
    const modalClose = document.getElementById('company-modal-close');
    const modalOverlay = document.getElementById('company-modal-overlay');

    companyCards.forEach(card => {
        card.addEventListener('click', function () {
            const name = card.getAttribute('data-name');
            const img = card.getAttribute('data-img');
            const content = card.getAttribute('data-content');
            modalBody.innerHTML = `
                <img src="${img}" alt="${name}" class="company-modal-img" />
                <h2 class="company-modal-title">${name}</h2>
                <div class="company-modal-info">${content}</div>
            `;
            modal.classList.add('active');
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        modalBody.innerHTML = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// ========== Gallery Modal Logic ==========
document.addEventListener('DOMContentLoaded', function () {
  // Gallery modal logic
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryModal = document.getElementById('gallery-modal');
  const galleryModalClose = document.getElementById('gallery-modal-close');
  const galleryModalOverlay = document.getElementById('gallery-modal-overlay');
  const galleryViewer = document.getElementById('gallery-viewer');

  // Map each card to 3 unique images (replace with your actual images if needed)
  const galleryData = [
    {
      name: 'ARTICLE 2 - JEANS BLUE',
      images: [
        'https://farida.co.in/Content/Products/Shoe-2.jpg',
        'https://farida.co.in/Content/Products/Shoe2-1.jpg',
        'https://farida.co.in/Content/Products/Shoe2-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 3 - BLACK',
      images: [
        'https://farida.co.in/Content/Products/Shoe-3.jpg',
        'https://farida.co.in/Content/Products/Shoe3-1.jpg',
        'https://farida.co.in/Content/Products/Shoe3-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 4 - BROWN',
      images: [
        'https://farida.co.in/Content/Products/Shoe-4.jpg',
        'https://farida.co.in/Content/Products/Shoe4-1.jpg',
        'https://farida.co.in/Content/Products/Shoe4-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 5 - SNUFF',
      images: [
        'https://farida.co.in/Content/Products/Shoe-5.jpg',
        'https://farida.co.in/Content/Products/Shoe5-1.jpg',
        'https://farida.co.in/Content/Products/Shoe5-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 6 - BROWN',
      images: [
        'https://farida.co.in/Content/Products/Shoe-6.jpg',
        'https://farida.co.in/Content/Products/Shoe6-1.jpg',
        'https://farida.co.in/Content/Products/Shoe6-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 7 - TAN',
      images: [
        'https://farida.co.in/Content/Products/Shoe-7.jpg',
        'https://farida.co.in/Content/Products/Shoe7-1.jpg',
        'https://farida.co.in/Content/Products/Shoe7-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 8 - NAVY',
      images: [
        'https://farida.co.in/Content/Products/Shoe-8.jpg',
        'https://farida.co.in/Content/Products/Shoe8-1.jpg',
        'https://farida.co.in/Content/Products/Shoe8-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 9 - NAVY',
      images: [
        'https://farida.co.in/Content/Products/Shoe-9.jpg',
        'https://farida.co.in/Content/Products/Shoe9-1.jpg',
        'https://farida.co.in/Content/Products/Shoe9-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 10 - TAN',
      images: [
        'https://farida.co.in/Content/Products/Shoe-10.jpg',
        'https://farida.co.in/Content/Products/Shoe10-1.jpg',
        'https://farida.co.in/Content/Products/Shoe10-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 11 - BLACK',
      images: [
        'https://farida.co.in/Content/Products/Shoe-11.jpg',
        'https://farida.co.in/Content/Products/Shoe11-1.jpg',
        'https://farida.co.in/Content/Products/Shoe11-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 12 - TAN',
      images: [
        'https://farida.co.in/Content/Products/Shoe-12.jpg',
        'https://farida.co.in/Content/Products/Shoe12-1.jpg',
        'https://farida.co.in/Content/Products/Shoe12-2.jpg'
      ]
    },
    {
      name: 'ARTICLE 13 - BURGUNDY',
      images: [
        'https://farida.co.in/Content/Products/Shoe-13.jpg',
        'https://farida.co.in/Content/Products/Shoe13-1.jpg',
        'https://farida.co.in/Content/Products/Shoe13-2.jpg'
      ]
    }
  ];

  let currentGalleryIndex = 0;
  let currentImageIndex = 0;

  function renderGalleryImage() {
    const data = galleryData[currentGalleryIndex];
    const image = data.images[currentImageIndex];
    galleryViewer.innerHTML = `
      <div class="gallery-modal-header">
        <button class="btn btn-dark btn-sm" id="gallery-prev">&#8592;</button>
        <span class="gallery-modal-title">${data.name} (${currentImageIndex + 1}/3)</span>
        <button class="btn btn-dark btn-sm" id="gallery-next">&#8594;</button>
      </div>
      <img src="${image}" alt="${data.name} image ${currentImageIndex + 1}" />
    `;
    document.getElementById('gallery-prev').onclick = function(e) {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex - 1 + data.images.length) % data.images.length;
      renderGalleryImage();
    };
    document.getElementById('gallery-next').onclick = function(e) {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex + 1) % data.images.length;
      renderGalleryImage();
    };
  }

  galleryCards.forEach((card, idx) => {
    card.addEventListener('click', function () {
      currentGalleryIndex = idx;
      currentImageIndex = 0;
      renderGalleryImage();
      galleryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeGalleryModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
    galleryViewer.innerHTML = '';
  }

  galleryModalClose.addEventListener('click', closeGalleryModal);
  galleryModalOverlay.addEventListener('click', closeGalleryModal);
  galleryModal.addEventListener('mousedown', function(e) {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
      closeGalleryModal();
    }
  });
});

// ========== SUSTAINABILITY TABS & CAROUSELS ==========
document.addEventListener('DOMContentLoaded', function () {
  // Tab switching
  const tabs = document.querySelectorAll('.sustainability-tab');
  const tabContents = document.querySelectorAll('.sustainability-tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      tabContents.forEach(tc => tc.style.display = 'none');
      document.getElementById(tab.getAttribute('data-tab')).style.display = 'block';
    });
  });

  // Carousels for each section
  const communityImages = [
    { src: 'https://farida.co.in/Content/CSR/csr-1-5.jpg', caption: 'Eye Camp Screening / Spectacle Distribution' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-6.jpg', caption: 'Eye Camp Screening / Spectacle Distribution' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-1.jpg', caption: 'Pulse Polio Camps' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-2.jpg', caption: 'Pulse Polio Camps' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-12.jpg', caption: 'Children\'s clinic' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-13.jpg', caption: 'Children\'s clinic' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-3.jpg', caption: 'Ambulance Service' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-9.jpg', caption: 'Water treatment plant for Schools' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-11.jpg', caption: 'Water treatment plant for Schools' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-8.jpg', caption: 'Clean drinking water supply' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-14.jpg', caption: 'Education cum Career guidance fair' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-15.jpg', caption: 'Education cum Career guidance fair' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-16.jpg', caption: 'Education cum Career guidance fair' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-20.jpg', caption: 'Tuition centres' },
    { src: 'https://farida.co.in/Content/CSR/csr-1-22.jpg', caption: 'Girl Child Rights Program' }
  ];
  const environmentImages = [
    { src: 'https://farida.co.in/Content/CSR/csr-2-1.jpg', caption: 'Green Neighborhood' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-2.jpg', caption: 'Green Neighborhood' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-3.jpg', caption: 'Green Neighborhood' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-4.jpg', caption: 'Green Neighborhood' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-5.jpg', caption: 'Green Neighborhood' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-6.jpg', caption: 'Treating / Recycling waste water' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-7.jpg', caption: 'Treating / Recycling waste water' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-8.jpg', caption: 'Bio Mass – Briquettes used for Boiler in place of Coal' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-11.jpg', caption: 'Solar panels for steam generation' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-12.jpg', caption: 'Solar panels for steam generation' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-13.jpg', caption: 'Solar panels for steam generation' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-14.jpg', caption: 'Renewable Energy Consumption – Wind Energy' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-15.jpg', caption: 'Certificate' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-16.jpg', caption: 'Certificate' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-17.jpg', caption: 'Zero liquid discharge through 5 stage RO Plant' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-18.jpg', caption: 'Zero liquid discharge through 5 stage RO Plant' },
    { src: 'https://farida.co.in/Content/CSR/csr-2-19.jpg', caption: 'Zero liquid discharge through 5 stage RO Plant' }
  ];
  const welfareImages = [
    { src: 'https://farida.co.in/Content/CSR/csr-3-1.jpg', caption: 'Inhouse Health centres' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-2.jpg', caption: 'Inhouse Health centres' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-3.jpg', caption: 'Inhouse Health centres' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-4.jpg', caption: 'Inhouse Health centres' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-5.jpg', caption: 'Creche Facility' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-6.jpg', caption: 'Creche Facility' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-7.jpg', caption: 'Health camps' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-8.jpg', caption: 'Health camps' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-9.jpg', caption: 'Health camps' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-10.jpg', caption: 'Health camps' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-11.jpg', caption: 'HER awareness programs' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-12.jpg', caption: 'HER awareness programs' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-13.jpg', caption: 'HER awareness programs' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-14.jpg', caption: 'HER awareness programs' },
    { src: 'https://farida.co.in/Content/CSR/csr-3-15.jpg', caption: 'Nutrition supplements to expecting mothers' }
  ];
  let communityIdx = 0, environmentIdx = 0, welfareIdx = 0;

  function updateCommunityCarousel(idx) {
    const img = document.getElementById('community-img');
    const caption = document.getElementById('community-caption');
    img.src = communityImages[idx].src;
    caption.textContent = communityImages[idx].caption;
  }
  function updateEnvironmentCarousel(idx) {
    const img = document.getElementById('environment-img');
    const caption = document.getElementById('environment-caption');
    img.src = environmentImages[idx].src;
    caption.textContent = environmentImages[idx].caption;
  }
  
  function updateWelfareCarousel(idx) {
    const img = document.getElementById('welfare-img');
    const caption = document.getElementById('welfare-caption');
    img.src = welfareImages[idx].src;
    caption.textContent = welfareImages[idx].caption;
  }

  // Community
  document.getElementById('community-prev').onclick = function() {
    communityIdx = (communityIdx - 1 + communityImages.length) % communityImages.length;
    updateCommunityCarousel(communityIdx);
  };
  document.getElementById('community-next').onclick = function() {
    communityIdx = (communityIdx + 1) % communityImages.length;
    updateCommunityCarousel(communityIdx);
  };
  // Initialize community carousel on load
  updateCommunityCarousel(communityIdx);

  // Environment
  document.getElementById('environment-prev').onclick = function() {
    environmentIdx = (environmentIdx - 1 + environmentImages.length) % environmentImages.length;
    updateEnvironmentCarousel(environmentIdx);
  };
  document.getElementById('environment-next').onclick = function() {
    environmentIdx = (environmentIdx + 1) % environmentImages.length;
    updateEnvironmentCarousel(environmentIdx);
  };
  // Initialize environment carousel on load
  updateEnvironmentCarousel(environmentIdx);

  // Welfare
  document.getElementById('welfare-prev').onclick = function() {
    welfareIdx = (welfareIdx - 1 + welfareImages.length) % welfareImages.length;
    updateWelfareCarousel(welfareIdx);
  };
  document.getElementById('welfare-next').onclick = function() {
    welfareIdx = (welfareIdx + 1) % welfareImages.length;
    updateWelfareCarousel(welfareIdx);
  };
  // Initialize welfare carousel on load
  updateWelfareCarousel(welfareIdx);
}); 

document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu logic
  const hamburger = document.getElementById('navbar-hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });
    // Close menu on nav-link click (mobile)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
      });
    });
  }
}); 