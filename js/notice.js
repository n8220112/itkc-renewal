const posts = [];

// 기존 테이블에서 데이터 추출
document.querySelectorAll('#postTable tbody tr').forEach(tr => {
  const tds = tr.querySelectorAll('td');
  posts.push({
    category: tds[0].textContent.trim(),
    title: tds[1].textContent.trim(),
    date: tds[2].textContent.trim(),
    views: tds[3].textContent.trim()
  });
});

// 테이블 초기화
document.querySelector('#postTable tbody').innerHTML = '';

const rowsPerPage = 10;
let currentPage = 1;
let currentCategory = 'all';
const tbody = document.querySelector('#postTable tbody');
const pagination = document.querySelector('.pagination');
const noticeTotal = document.querySelector('.notice_total');

// 게시글 출력
function displayPosts(page = 1) {
  currentPage = page;

  const filtered = currentCategory === 'all'
    ? posts
    : posts.filter(p => p.category === currentCategory);

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginated = filtered.slice(start, end);

  tbody.innerHTML = '';
  paginated.forEach((post, idx) => {
    const number = filtered.length - ((page - 1) * rowsPerPage + idx); // 역순
    const row = `<tr><td>${number}</td><td>${post.category}</td><td>${post.title}</td><td>${post.date}</td><td>${post.views}</td></tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });

  renderPagination(filtered.length, page);
  updateNoticeTotal(filtered.length);
}

// 페이지네이션
function renderPagination(total, page) {
  const totalPages = Math.ceil(total / rowsPerPage);
  const pagesPerBlock = 10;
  const currentBlock = Math.floor((page - 1) / pagesPerBlock);
  const startPage = currentBlock * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);

  pagination.innerHTML = '';

  // ≪ 첫 페이지
  if (page > 1) {
    const firstBtn = document.createElement('button');
    firstBtn.innerHTML = '<i class="fa-solid fa-angles-left"></i>';
    firstBtn.addEventListener('click', () => {
      currentPage = 1;
      displayPosts(currentPage);
    });
    pagination.appendChild(firstBtn);
  }

  // 〈 이전 블록
  if (startPage > 1) {
    const prevBlockBtn = document.createElement('button');
    prevBlockBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
    prevBlockBtn.addEventListener('click', () => {
      currentPage = startPage - 1;
      displayPosts(currentPage);
    });
    pagination.appendChild(prevBlockBtn);
  }

  // 페이지 번호 버튼들만 따로 감싸기
  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('pagination-buttons');

  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === page) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      displayPosts(i);
    });
    buttonWrapper.appendChild(btn);
  }

  pagination.appendChild(buttonWrapper);

  // 〉 다음 블록
  if (endPage < totalPages) {
    const nextBlockBtn = document.createElement('button');
    nextBlockBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
    nextBlockBtn.addEventListener('click', () => {
      currentPage = endPage + 1;
      displayPosts(currentPage);
    });
    pagination.appendChild(nextBlockBtn);
  }

  // ≫ 마지막 페이지
  if (page < totalPages) {
    const lastBtn = document.createElement('button');
    lastBtn.innerHTML = '<i class="fa-solid fa-angles-right"></i>';
    lastBtn.addEventListener('click', () => {
      currentPage = totalPages;
      displayPosts(currentPage);
    });
    pagination.appendChild(lastBtn);
  }
}


// 게시물 수/페이지 수 표시
function updateNoticeTotal(totalItems) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  noticeTotal.innerHTML = `<p>총 게시물 수 <strong>${totalItems}</strong> / 총 페이지 수 <strong>${totalPages}</strong></p>`;
}

// 카테고리 버튼 클릭 이벤트
document.querySelectorAll('.tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    currentPage = 1;
    displayPosts(currentPage);
  });
});

// 초기 출력
displayPosts();