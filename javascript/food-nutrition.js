// ========= DOM =========== //
// 메인 컨테이너
const $mainContainer = document.querySelector('.main-container');
// 입력창
const $productNameInput = document.querySelector(".main-container .image-box .text-box .search-bar input");
// 검색 버튼
const $searchBtn = document.querySelector(".main-container .search-bar button.search-button");
// 검색결과 박스
const $resultDiv = document.querySelector('.main-container .result');
// 메인 컨테이너 텍스트 박스
const $mainContainerTextBox = document.querySelector('.main-container .text-box');
// no result 텍스트 
const $noResult = document.querySelector('.main-container .no-result');


// ============= 함수 ============= //
// 디바운스
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}

  // 쓰로틀
function throttle(func, limit) {
  let lastFunc;
  let lastRan;

  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}


// ================= 이벤트 핸들러 ================== //
// 검색 이벤트
async function searchProduct(e) {
  // input 박스 사용자 입력값 가져오기
  const inputFood = $productNameInput.value;

  // 식약처 DB에서 해당 이름 가진 제품 검색하기
  // 1. url 구조
  const apiKey =
    "ccStZzcWOtwXEPyP7883p9z3cpgynAtuqu2jduhjkmFE0POBfxWkCOAvSjMPvqOeJgAK8IgXTzwo%2B6rZfQduZQ%3D%3D";
  const pageNo = 1;
  const numberOfRows = 100;
  const foodName = inputFood;
  const url = `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01?serviceKey=${apiKey}&pageNo=${pageNo}&numOfRows=${numberOfRows}&type=json&FOOD_NM_KR=${inputFood}`;

  // 2. API 검색
  const response = await fetch(url);
  const apiData = await response.json();
  const searchResult = apiData.body.items;

  // !! searchResult가 없다 == 검색결과가 없음
  //  => 검색 결과 없을 때 효과
  if (!searchResult || searchResult.length === 0) {
    $noResult.style.display = 'block';
    $resultDiv.innerHTML = "";
    $resultDiv.classList.add('when-no-result');
    return;
  }
  // 검색 결과 있으면 바로 위에서 했단 효과 제거 하기
  $noResult.style.display = 'none';
  $resultDiv.classList.remove('when-no-result');

  // 기존 결과 누적 방지
  $resultDiv.innerHTML = "";

  // 3. 검색 결과에서 각 항목 잡아오기 & 태그 생성
  searchResult.forEach((item) => {
    // destructuring
    let {
      FOOD_NM_KR: foodName,
      FOOD_CD: code,
      AMT_NUM1: calorie,
      AMT_NUM3: protein,
      AMT_NUM7: carbo,
      AMT_NUM9: fiber,
      AMT_NUM24: cholesterol,
      AMT_NUM25: saturatedFat,
      AMT_NUM26: transFat,
      AMT_NUM62: unsaturatedFat,
      MAKER_NM: manufacturer,
    } = item;


    // 태그 생성하기
    $newDiv = document.createElement("div");
    $newDiv.classList.add("product-card");
    $newDiv.dataset.code = code;
    $newDiv.innerHTML = `
      <span class=foodName data-code="${code}">${foodName} (업체명: ${manufacturer || '- '})</span>
    `;
    $resultDiv.append($newDiv);
  });
  // 메뉴 박스 크기 조정
  $mainContainerTextBox.classList.add('search-mode');
  console.log($mainContainerTextBox);

  // 검색 결과 박스 열기
  $resultDiv.style.display = 'block';
}



// 검색 입력창에 입력 후 엔터 치면 검색버튼 누른 것과 같은 효과 주는 핸들러
function productNameInputandEnterHandler(e) {
  if (e.key === 'Enter') {
    searchProduct(e);
  }
}

// 검색 결과 나오는 이벤트
function showDetail(e) {
  console.log(e.target);
  if (e.target.classList.contains('product-card')) return;
  console.log('여긴 akwdma');
}


// ================ 이벤트 등록 ================== //
// 검색 이벤트 (1) : 버튼 클릭 했을 때
$searchBtn.addEventListener("click", searchProduct);
// 검색 이벤트 (2) : input에서 입력할 때;
$productNameInput.addEventListener('input', debounce(searchProduct, 200));
// 검색 이벤트 (3) : input 에서 enter 누를 때
$productNameInput.addEventListener('keydown', productNameInputandEnterHandler);

// 결과 나오는 이벤트
$resultDiv.addEventListener('click', showDetail);





