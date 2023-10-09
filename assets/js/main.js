/**
* Template Name: Lumia
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/lumia-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();
  const danhSachUngHo = [
    { id: 1, ten: "Bác Sĩ Trần Như Duy", soTien: 500000 },
    { id: 2, ten: "Đỗ Thị Thùy Linh", soTien: 200000 },
    { id: 3, ten: "Gia Đình Em Đan", soTien: 400000 },
    { id: 4, ten: "Võ Thành Công", soTien: 100000 },
    { id: 5, ten: "Hồ Thanh Thủy", soTien: 500000 },
    { id: 6, ten: "Lê Trần Đại Phát", soTien: 100000 },
    { id: 7, ten: "Nguyễn Trí Định", soTien: 40000 },
    { id: 8, ten: "Lê Võ Lan Nhi", soTien: 200000 },
    { id: 9, ten: "Hoàng Thành", soTien: 200000 },
    { id: 10, ten: "Hoàng Khải Thư", soTien: 200000 },
    { id: 11, ten: "Hồ Thanh Hương", soTien: 200000 },
    { id: 12, ten: "Trần Thị Ái Linh", soTien: 50000 },
    { id: 13, ten: "Đặng Huỳnh Huy", soTien: 30000 },
    { id: 14, ten: "Phùng Lê Uyên Phương", soTien: 200000 },
    { id: 15, ten: "Lê Võ Quang", soTien: 25000 },
    { id: 16, ten: "Huỳnh Minh Thanh", soTien: 50000 },
    { id: 17, ten: "Huỳnh Minh Nhật", soTien: 20000 },
    { id: 18, ten: "Cáp Đoàn Phúc", soTien: 60000 },
    { id: 19, ten: "Tô Nhã Phương", soTien: 10000 },
    { id: 20, ten: "Nguyễn Đức Thắng", soTien: 10000 },
    { id: 21, ten: "Lữ Ngọc Quyến", soTien: 50000 },
    { id: 22, ten: "Dương Thanh Phương", soTien: 100000 },
    { id: 23, ten: "Nguyễn Phan Chinh Châu", soTien: 5000 },
    { id: 24, ten: "Lớp Toàn Cá Chép (Thầy Huy)", soTien: 600000 },
    { id: 25, ten: "Đinh Phước Tài", soTien: 200000 },
  ];
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',

  });

  const itemsPerPage = 5; // Số hàng trên mỗi trang
  const table = document.getElementById('myTable');
  const rows = table.getElementsByTagName('tr');
  const totalItems = danhSachUngHo.length; // Sử dụng độ dài của danhSachUngHo thay vì độ dài của hàng
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Hàm để hiển thị các mục trên trang được chỉ định
  function displayPage(page) {
    for (let i = 1; i < rows.length; i++) {
      if (i >= (page - 1) * itemsPerPage + 1 && i <= page * itemsPerPage) {
        rows[i].style.display = 'table-row';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }

  // Tạo nút phân trang bằng JavaScript
  const pagination = document.getElementById('pagination');
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    if (i === 1) {
      li.classList.add('active');
    }
    li.addEventListener('click', function () {
      const currentPage = parseInt(this.textContent);
      displayPage(currentPage);
      // Loại bỏ lớp active từ tất cả các nút và thêm nó vào nút được chọn
      const paginationItems = document.querySelectorAll('.pagination li');
      paginationItems.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    });
    pagination.appendChild(li);
  }

  // Hiển thị trang đầu tiên ban đầu


  // Render dữ liệu vào bảng
  danhSachUngHo.forEach((doiTuong, index) => {
    const row = table.insertRow(); // Tạo một hàng mới trong bảng

    // Chèn dữ liệu vào các ô trong hàng
    const sttCell = row.insertCell(0);
    sttCell.textContent = doiTuong.id;

    const hoTenCell = row.insertCell(1);
    hoTenCell.textContent = doiTuong.ten;

    const soTienUngHoCell = row.insertCell(2);
    soTienUngHoCell.textContent = formatter.format(doiTuong.soTien);
    displayPage(1);
  });
  function tinhTongSoTien(danhSach) {
    return danhSach.reduce((total, doiTuong) => total + doiTuong.soTien, 0);
  }
  const tongSoTien = tinhTongSoTien(danhSachUngHo);
  const tongSoTienElement = document.getElementById('sum');
  if (tongSoTienElement) {
    tongSoTienElement.textContent = formatter.format(tongSoTien);
  }

})()