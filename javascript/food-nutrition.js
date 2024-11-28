// =============전역 변수 =============== //
// API 주소
const apiKey = apiKeyIgnore;
const pageNo = 1;
const numberOfRows = 100;

let isModalMode = false;

let myChart1;
let myChart2;
let myChart3;
let myChart4;
let myChart5;
let myChart6;
let myChart7;
let myChart8;

let manufacturerText;

// localStorage용
let favoriteItems = [];
let favoriteItemsStorage;

// 디바운스용 (displayfavorite 함수에서도 searchproduct() 중단용으로 사용)
let timeoutId;

// 게임 모드
isFoodGameMode = false;
console.log(isFoodGameMode);

// ========= DOM =========== //
// 메인 컨테이너
const $mainContainer = document.querySelector(".main-container");
// 입력창
const $productNameInput = document.querySelector(
  ".main-container .image-box .text-box .search-bar input"
);
// 검색 버튼
const $searchBtn = document.querySelector(
  ".main-container .search-bar button.search-button"
);
// 검색결과 박스
const $resultDiv = document.querySelector(".main-container .result");
// 메인 컨테이너 텍스트 박스
const $mainContainerTextBox = document.querySelector(
  ".main-container .text-box"
);
// no result 텍스트
const $noResult = document.querySelector(".main-container .no-result");
// modal
const $modalOverlay = document.querySelector(".modal-overlay");
const $modalCloseBtn = document.querySelector(".modal-overlay .close-btn");
const $loader = document.querySelector("#detail-loader");
const $loadingAlertP = document.getElementById("detail-loading-alert");
const $charts = document.querySelectorAll(".modal-body canvas");
// const $genderSelect = document.getElementById('genderSelect');
// 즐겨찾기
const $unfavoriteIcon = document.querySelector(".modal-header i.unfavorite");
const $favoriteIcon = document.querySelector(".modal-header i.add-to-favorite");
const $favoriteSpan = document.querySelector(".modal-header span.favorite");
const $unfavoriteSpan = document.querySelector(".modal-header span.unfavorite");

// ============= 함수 ============= //
// 디바운스
function debounce(func, delay) {
  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
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

// 상세보기 로딩 아이콘 & 멘트 토글
function detailedInfoSectionLoadingToggle() {
  if (isLoading) {
    // 로딩 아이콘 활성화
    $loader.style.display = "block";
    // 로딩 멘트 활성화
    $loadingAlertP.classList.remove("hide");
    $charts.forEach(($chart) => {
      $chart.style.display = "none";
    });
    // 즐겨찾기 버튼 비활성화
    $unfavoriteIcon.style.display = "none";
    $favoriteIcon.style.display = "none";
  } else {
    // 로딩 아이콘 비활성화
    $loader.style.display = "none";
    // 로딩 멘트 비활성화
    $loadingAlertP.classList.add("hide");
    $charts.forEach(($chart) => {
      $chart.style.display = "block";
    });
    // 초기 세팅 : 즐겨찾기 미등록상태가 보이게
    document.querySelector(".modal-header i.unfavorite").style.display =
      "block";
  }
}

function createChart(SelectedItemForShowDetailFunction) {
  // =============== $$$ 칼로리 차트
  // !! 이미 차트가 존재하면 기존 차트 파괴 (canvas는 한 번 밖에 못 씀)
  if (myChart1) {
    myChart1.destroy();
  }

  // 차트 공통 디자인 설정
  const chartWidth = 330;
  const chartHeight = 350;
  const fontSize = "12px";
  const fontFamily = "Noto Sans KR";

  // 차트에 필요한 값 fetch 된 값에서 가져오기
  let {
    FOOD_NM_KR: foodName,
    FOOD_CD: code,
    SERVING_SIZE: servingSize,
    AMT_NUM1: calorie,
    AMT_NUM3: protein,
    AMT_NUM4: fat,
    AMT_NUM7: carbo,
    AMT_NUM8: sugar,
    AMT_NUM9: fiber,
    AMT_NUM24: cholesterol,
    AMT_NUM25: saturatedFat,
    AMT_NUM26: transFat,
    AMT_NUM62: unsaturatedFat,
    MAKER_NM: manufacturer,
  } = SelectedItemForShowDetailFunction;

  // ******* 1. 칼로리 차트
  let myCt1 = document.getElementById("myChart1");
  myCt1.width = chartWidth;
  myCt1.height = chartHeight;
  let selectedItem = calorie;
  let chartTitle = "칼로리";
  let chartUnit = "kcal";
  let recommendedDailyConsumptionForWoman = 2000;
  let recommendedDailyConsumptionForMan = 2500;
  let data = [
    Math.round(selectedItem),
    recommendedDailyConsumptionForWoman,
    recommendedDailyConsumptionForMan,
  ];

  myChart1 = new Chart(myCt1, {
    type: "bar",
    data: {
      labels: [`${chartTitle} (서빙사이즈 : ${servingSize})`],
      datasets: [
        {
          label: `음식 ${chartTitle}`,
          data: [data[0]],
          backgroundColor: "#b4cd93",
          maxBarThickness: 50,
          barThickness: 50,
          datalabels: {
            anchor: "end",
            align: "top",
            offset: 2,
          },
        },
        {
          label: `일일 권장 ${chartTitle}_성인 여성`,
          data: [data[1]],
          backgroundColor: "#D1D5D8",
          maxBarThickness: 50,
          barThickness: 50,
          datalabels: {
            anchor: "end",
            align: "bottom",
            offset: 2,
          },
        },
        {
          label: `일일 권장 ${chartTitle}_성인 남성`,
          data: [data[2]],
          backgroundColor: "#E0E0E0",
          maxBarThickness: 50,
          barThickness: 50,
          datalabels: {
            anchor: "end",
            align: "bottom",
            offset: 2,
          },
        },
      ],
    },
    options: {
      responsive: false,
      aspectRatio: 1,
      scales: {
        y: {
          beginAtZero: true,
          max: Math.max(...data),
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            font: {
              size: fontSize,
              family: fontFamily,
              color: "#000",
            },
            padding: 20,
          },
          border: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: fontSize,
              family: fontFamily,
            },
            padding: 10,
            boxWidth: 12, // 범례의 색상 박스 크기
            maxWidth: 180, // 범례가 2줄로 나뉘도록 폭 제한
            // `usePointStyle: true`를 설정하면 점 스타일로 범례가 나타남
            usePointStyle: true,
          },
        },
        datalabels: {
          anchor: "end",
          align: "bottom",
          font: {
            size: fontSize,
            family: fontFamily,
          },
          offset: 2,
          clip: false,
          formatter: function (value) {
            return `${value} ${chartUnit}`;
          },
        },
      },
      layout: {
        padding: {
          top: 10,
          bottom: 5,
        },
      },
      barPercentage: 1.0,
      categoryPercentage: 1.0,
    },
    plugins: [ChartDataLabels],
  });

  // Chart 2 - 탄수화물
  if (myChart2) myChart2.destroy();
  myChart2 = createOtherChart(
    "myChart2",
    carbo,
    "탄수화물",
    324,
    "g",
    servingSize,
    chartWidth,
    chartHeight,
    fontSize,
    fontFamily
  );

  // Chart 3 - 당류
  if (myChart3) myChart3.destroy();
  myChart3 = createOtherChart(
    "myChart3",
    sugar,
    "당류",
    100,
    "g",
    servingSize,
    chartWidth,
    chartHeight,
    fontSize,
    fontFamily
  );

  // Chart 4 - 지방
  if (myChart4) myChart4.destroy();
  myChart4 = createOtherChart(
    "myChart4",
    fat,
    "지방",
    54,
    "g",
    servingSize,
    chartWidth,
    chartHeight,
    fontSize,
    fontFamily
  );

  // Chart 5 - 트랜스지방
  if (myChart5) myChart5.destroy();
  myChart5 = createOtherChart(
    "myChart5",
    transFat,
    "트랜스지방",
    2,
    "g",
    servingSize,
    chartWidth,
    chartHeight,
    fontSize,
    fontFamily
  );

  // Chart 6 - 포화지방
  if (myChart6) myChart6.destroy();
  myChart6 = createOtherChart(
    "myChart6",
    saturatedFat,
    "포화지방",
    15,
    "g",
    servingSize,
    chartWidth,
    chartHeight,
    fontSize,
    fontFamily
  );

  // Chart 7 - 콜레스테롤
  if (myChart7) myChart7.destroy();
  myChart7 = createOtherChart(
    "myChart7",
    cholesterol,
    "콜레스테롤",
    300,
    "mg",
    servingSize,
    chartWidth,
    chartHeight,
    fontSize,
    fontFamily
  );

  // Chart 8 - 단백질
  if (myChart8) myChart8.destroy();
  myChart8 = createOtherChart(
    "myChart8",
    protein,
    "단백질",
    55,
    "g",
    servingSize,
    chartWidth,
    chartHeight,
    fontSize,
    fontFamily
  );
}
function createOtherChart(
  chartId,
  selectedItem,
  chartTitle,
  recommendedDailyConsumption,
  chartUnit,
  servingSize,
  chartWidth,
  chartHeight,
  fontSize,
  fontFamily
) {
  const chartCanvas = document.getElementById(chartId);
  chartCanvas.width = chartWidth;
  chartCanvas.height = chartHeight;

  const data = [Math.round(selectedItem), recommendedDailyConsumption];
  const maxDataValue = Math.max(...data); // 최대값 계산

  return new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: [`${chartTitle} (서빙사이즈 : ${servingSize})`],
      datasets: [
        {
          label: `음식 ${chartTitle}`,
          data: [data[0]],
          backgroundColor: "#b4cd93",
          maxBarThickness: 50,
          barThickness: 50,
          datalabels: {
            // 첫 번째 데이터셋에만 datalabels 설정
            anchor: "end",
            align: "top", // 첫 번째 막대 위에 값을 표시
            offset: 5,
            font: {
              size: fontSize,
              family: fontFamily,
            },
            formatter: function (value) {
              return `${value} ${chartUnit}`;
            },
          },
        },
        {
          label: `1일 영양성분 기준치_${chartTitle}`,
          data: [data[1]],
          backgroundColor: "#D1D5D8",
          maxBarThickness: 50,
          barThickness: 50,
          datalabels: {
            // 두 번째 데이터셋에 datalabels 설정
            anchor: "end",
            align: "bottom", // 두 번째 막대 아래에 값을 표시
            offset: 5,
            font: {
              size: fontSize,
              family: fontFamily,
            },
            formatter: function (value) {
              return `${value} ${chartUnit}`;
            },
          },
        },
      ],
    },
    options: {
      responsive: false,
      aspectRatio: 1,
      scales: {
        y: {
          beginAtZero: true,
          max: maxDataValue,
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            font: {
              size: fontSize,
              family: fontFamily,
              color: "#000",
            },
            padding: 20,
          },
          border: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: fontSize,
              family: fontFamily,
            },
            padding: 10,
            boxWidth: 12,
            maxWidth: 180, // 범례 2줄로 표시되도록
            usePointStyle: true,
          },
        },
      },
      layout: {
        padding: {
          top: 10,
          bottom: 5,
        },
      },
      barPercentage: 1.0,
      categoryPercentage: 1.0,
    },
    plugins: [ChartDataLabels],
  });
}

// 랜덤 푸드 선택 (슬롯머신용)
function randomFood() {
  const foodList = [
    "제육볶음",
    "닭가슴살",
    "떡볶이",
    "굶어",
    "불고기",
    "아보카도명란덮밥",
    "김밥",
    "고등어",
    "마라탕",
    "소고기무국",
    "오리훈제",
    "샐러드",
    "불닭볶음면",
    "현미밥",
    "갈비찜",
    "계란찜",
    "치킨",
    "두부조림",
    "김치찌개",
    "연어",
    "된장찌개",
    "치즈돈까스",
    "보쌈",
    "연두부",
    "제주흑돼지",
    "시금치나물",
    "초밥",
    "야채볶음",
    "닭다리구이",
    "방울토마토",
    "샤브샤브",
    "참치회",
    "갈릭버터새우",
    "브로콜리",
    "크림파스타",
    "된장국",
    "잡채",
    "구운채소",
    "해물파전",
    "피자",
    "나물비빔밥",
    "오징어볶음",
    "새우튀김",
    "콩비지찌개",
    "수제버거",
    "비빔밥",
    "갈비탕",
    "찜닭",
    "스시",
    "두부덮밥",
    "김치전",
    "치즈스틱",
    "매운갈비찜",
    "통삼겹살",
    "파스타",
    "닭갈비",
    "돼지국밥",
    "회덮밥",
    "피자마르겔라",
    "고추장찌개",
    "양념갈비",
    "김치볶음밥",
    "비빔국수",
    "불고기버거",
    "김치말이",
    "쌀국수",
    "닭고기커리",
    "떡국",
    "회덮밥",
    "수제비",
    "바지락칼국수",
    "미역국",
    "샐러드롤",
    "장어덮밥",
    "소고기 볶음밥",
    "자장면",
    "고등어조림",
    "애호박볶음",
    "오믈렛",
    "부대찌개",
    "돼지불고기",
    "순대국밥",
    "어묵탕",
    "고추잡채",
    "탕수육",
    "쭈꾸미볶음",
    "콩국수",
    "감자탕",
    "순두부찌개",
    "매운탕",
    "버섯전골",
    "연두부무침",
    "불고기전골",
    "새우젓무침",
    "홍합탕",
    "잡곡밥",
    "고기만두",
    "시래기국",
    "치킨너겟",
    "마늘빵",
    "김치볶음",
    "소시지구이",
    "돼지고기장조림",
    "돈까스",
    "참치김밥",
    "떡국떡",
    "물냉면",
    "고기만두",
    "낙지볶음",
    "배추겉절이",
    "치즈볶음밥",
    "어묵볶음",
    "오이무침",
    "흑미밥",
    "돼지고기볶음",
    "추어탕",
    "비빔밥",
    "얼큰한탕수육",
    "오징어덮밥",
    "갈비구이",
  ];

  const randomIndex = Math.floor(Math.random() * foodList.length);
  return foodList[randomIndex];
}

// 메뉴 선택 슬롯머신 가동
function startSlothMachine() {
  const $foodDisplay = document.querySelector(".food-display");
  let count = 0;
  const interval = setInterval(() => {
    $foodDisplay.textContent = `오늘의 메뉴는: ${randomFood()}...`;
    count++;
    if (count >= 30) {
      // 빠르게 바뀌는 횟수를 30번으로 설정
      clearInterval(interval);
      $foodDisplay.textContent = `오늘의 메뉴는: ${randomFood()}❤️`; // 최종적으로 랜덤 음식 고정
      $foodDisplay.textContent.style.color = red;
    }
  }, 45); // 45ms마다 음식 변경
}

// 필요 DOM 불러오기
const $gameModal = document.querySelector(".food-game-modal.hidden");
const $gameContent = $gameModal.querySelector(".game-content"); // 게임 결과 표시할 DOM
const $gameMessage = $gameModal.querySelector(".game-message"); // 결과 안내 메시지

// ================= 이벤트 핸들러 ================== //
// 검색 이벤트
async function searchProduct(e) {
  // 1. 검색어 분할 작업('김치 피자'라고 검색해도 '김치 고구마 피자'도 검색 결과에 나오도록)

  /* !!! 검색어 분할 작업 로직 :
      1. 사용자 검색 단어를 공백 단위로 나누어서 배열로 저장
         e.g. 사용자 검색어가 '고구마 피자 감자'이면, [고구마,피자,감자]로 searchTerms 변수에 저장
      2. searchTerms 배열변수에 저장된 데이터에 대해, 각각 api에서 자료 검색하여, searchResults배열에 [첫번째단어검색결과,2번째단어검색결과,3번째단어검색결과] 이런식으로 저장
      3. searchResults 배열의 index 0, 즉 첫번째 단어 검색 결과를 finalResults 변수에 저장
      4. every
  */

  const inputFood = $productNameInput.value.trim(); // 앞 뒤 공백 없앰
  if (!inputFood) return; // 검색어가 비어있으면 종료

  const searchTerms = inputFood
    .split(" ")
    .map((term) => term.trim().toLowerCase()); // 입력된 검색어를 공백 기준으로 나누어 배열로 변환

  //   - 각 단어에 대한 검색 결과 저장
  let searchResults = []; // 검색 결과 저장할 배열
  //    -  검색어에 대해 각각 API를 호출하고 결과를 배열에 저장
  for (let term of searchTerms) {
    const url = `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01?serviceKey=${apiKey}&pageNo=${pageNo}&numOfRows=${numberOfRows}&type=json&FOOD_NM_KR=${term}`;
    const response = await fetch(url);
    const apiData = await response.json();
    const results = apiData.body.items;

    // 검색 결과가 있으면 배열에 추가
    if (results && results.length > 0) {
      searchResults.push(results);
    }
  }

  // 2. 검색 결과가 없을 때 : 검색 결과 없을 때 로직 실행
  if (
    searchResults.length === 0 ||
    searchResults.some((result) => result.length === 0)
  ) {
    $noResult.style.display = "block";
    $resultDiv.innerHTML = "";
    $resultDiv.classList.add("when-no-result");
    return;
  }

  // 검색 결과가 있을 때 로직
  //    1) noResult 표시 제거
  $noResult.style.display = "none";
  $resultDiv.classList.remove("when-no-result");
  //    2) 기존 결과를 초기화
  $resultDiv.innerHTML = "";
  //    3) 모든 단어가 포함된 searchResults만 필터링
  // 모든 검색어를 포함하는 제품만 남기기
  let filteredResults = [];
  // 첫 번째 검색 결과를 기준으로 시작
  for (let item of searchResults[0]) {
    let match = true;
    // 각 검색어가 모두 포함되는지 확인
    for (let term of searchTerms) {
      if (!item.FOOD_NM_KR.toLowerCase().includes(term)) {
        match = false;
        break;
      }
    }
    if (match) {
      filteredResults.push(item);
    }
  }

  console.log(filteredResults);
  // foodName을 기준으로 가나다 순으로 정렬 (대소문자 구분 없이)
  filteredResults.sort((a, b) => {
    let aFoodName = a.FOOD_NM_KR; // foodName 그대로 사용
    let bFoodName = b.FOOD_NM_KR; // foodName 그대로 사용

    if (aFoodName < bFoodName) return -1; // a가 b보다 앞에 오도록
    if (aFoodName > bFoodName) return 1; // b가 a보다 앞에 오도록
    return 0; // 같으면 순서 유지
  });

  // 4) 필터링된 결과를 사용자에게 표시
  filteredResults.forEach((item) => {
    let {
      FOOD_NM_KR: foodName,
      FOOD_CD: code,
      MAKER_NM: manufacturer,
      FOOD_OR_NM: category,
    } = item;
    manufacturerText = manufacturer;
    // category에서 괄호 및 괄호 안의 내용을 제거
    const cleanCategory = category
      ? category.replace(/\(.*?\)/, "").trim()
      : "";

    $newDiv = document.createElement("div");
    $newDiv.classList.add("product-card");
    $newDiv.dataset.foodName = foodName;
    $newDiv.dataset.code = code;
    $newDiv.dataset.manufacturer = manufacturer;
    $newDiv.innerHTML = `<span class="foodName">${foodName} (${
      manufacturerText
        ? "업체명: " + manufacturerText
        : "구분: " + cleanCategory
    })</span>`;
    $resultDiv.append($newDiv);
  });

  // 메뉴 박스 크기 조정
  $mainContainerTextBox.classList.add("search-mode");

  // 검색 결과 박스 열기
  $resultDiv.style.display = "block";
}

// 검색 입력창에 입력 후 엔터 치면 검색버튼 누른 것과 같은 효과 주는 핸들러
function productNameInputAndEnterHandler(e) {
  if (e.key === "Enter") {
    searchProduct(e);
  }
}

// 상세보기 모달 클로즈 이벤트
// 1. close 버튼
function closeModal(e) {
  // 모달 비활성화
  $modalOverlay.classList.remove("show");
  // 기존 모달 내용 비우고 로딩중이라고 표시
  $title.innerHTML = "로딩 중...";
}

// 2. 모달 활성화 상태에서 esc
async function escCloseModal(e) {
  if (!isModalMode) return; // 모달 활성화상태에서만 작동
  if (e.key !== "Escape") return;
  closeModal();
  isModalMode = false;
}


// ## 검색 결과 나오는 이벤트 ##
// 1. 메인 핸들러
async function showDetail(e) {
  if (shouldIgnoreClickForShowDetail(e)) return;   // 클릭 이벤트 무시 조건

  isModalMode = true; // 모달 활성화 모드에서 esc 누르면 모달 꺼지는 이벤트에서 사용하는 용
  isLoading = true; // detailedInfoSectionLoadingToggle 함수에서 로딩 중 여부 확인 용

  // 모달 활성화
  //    1. 기존 검색 결과 지우기
  const $title = document.querySelector(".modal-overlay .modal-header p");
  $title.textContent = "";
  //    2. 모달 팝업
  $modalOverlay.classList.add("show");

  // 로딩 멘트 및  로딩 아이콘 활성화
  detailedInfoSectionLoadingToggle();

  // 해당 제품의 정보 가져오기 위해 부모.product에서 정보 가져오기(식별자)
  $closestProductCard = e.target.closest(".product-card");

  // fetch
  // 1. 경로 세팅
  const inputFood = $closestProductCard.dataset.foodName;
  const url = `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01?serviceKey=${apiKey}&pageNo=${pageNo}&numOfRows=${numberOfRows}&type=json&FOOD_NM_KR=${inputFood}`;
  // 2. 불러오기
  const response = await fetch(url);
  const apiData = await response.json();
  const searchResult = apiData.body.items;
  console.log("kkk");
  console.log(searchResult);
  // 3. 제품 코드까지 같은 제품으로 찾기
  console.log("kkk");
  console.log($closestProductCard);
  const finalResult = searchResult.find(
    (item) => item.FOOD_CD === $closestProductCard.dataset.code
  );
  // 4. 정보 destructuring
  let {
    FOOD_NM_KR: foodName,
    FOOD_OR_NM: category,
    FOOD_CD: code,
    SERVING_SIZE: servingSize,
    AMT_NUM1: calorie,
    AMT_NUM3: protein,
    AMT_NUM4: fat,
    AMT_NUM7: carbo,
    AMT_NUM8: sugar,
    AMT_NUM9: fiber,
    AMT_NUM24: cholesterol,
    AMT_NUM25: saturatedFat,
    AMT_NUM26: transFat,
    AMT_NUM62: unsaturatedFat,
    MAKER_NM: manufacturer,
  } = finalResult;

  //  괄호 뒤 삭제
  const cleanCategory = category ? category.replace(/\(.*?\)/, "").trim() : "";

  // 6. 내용 모달에 집어넣기
  isLoading = false;
  detailedInfoSectionLoadingToggle(); // 로딩 멘트 및  로딩 아이콘 활성화
  console.log($title);
  $title.textContent = `${foodName} (${
    manufacturer ? "업체명: " + manufacturer : "구분: " + cleanCategory
  })`;
  $title.dataset.foodName = foodName; // 즐겨찾기 불러올 때 쓰는 용
  $title.dataset.id = code; // 즐겨찾기 불러올 때 쓰는 용
  $title.dataset.manufacturer = manufacturer; // 즐겨찾기 불러올 때 쓰는 용
  $title.dataset.category = cleanCategory;
  // localStorage에서 즐겨찾기 상태 가져와서 즐겨찾기 버튼 활성화 하기
  loadFavoriteStatusHandler();

  // 차트 업데이트
  createChart(finalResult);
}

// 2. (서브) 클릭이벤트 무시할 조건
function shouldIgnoreClickForShowDetail(e) {
  return (
    e.target.classList.contains("product-card") ||
    e.target.classList.contains("when-no-result") ||
    e.target.classList.contains("no-favorite-item") ||
    e.target.classList.contains("result")
  );
}


// 모달 가로 스크롤 스크롤 효과
function modalBodyHorizontalScrollHandler(e) {
  const $modalBody = e.currentTarget;
  // 가로 스크롤이 있으면 (=가로 전체 길이(scrollWidth)가 가로 viewport 길이(clientWidth)보다 길다)
  if ($modalBody.scrollWidth > $modalBody.clientWidth) {
    // wheel을 돌린 만큼(e.deltaY) 스크롤을 우측으로 이동해줘(scrollLeft :가로 스크롤 위치)
    $modalBody.scrollLeft += e.deltaY * 0.7;
  }
  // 세로 스크롤 동작 차단
  e.preventDefault();
}

// ## favorite 버튼 활성화 ## //
// 1. 메인 이벤트 핸들러
function toggleFavorite(e) {
  // 지역변수 설정
  const $modalTitleP = document.querySelector(".modal-title p");
  let isToBeUnfavorite;  // toggleIconAndTextForFavorite() 용
  const { foodName, id, manufacturer, category } = $modalTitleP.dataset; // favoriteItemDetail 설정 위한 변수

  // 즐겨찾기 활성화 된 상태에서 누르면
  if (e.target.classList.contains("add-to-favorite")) {
    // 아이콘 및 텍스트 스타일 변경
    isToBeUnfavorite = true;
    toggleIconAndTextForFavorite(isToBeUnfavorite);
    // local storage에서 지우기!!
    let index = favoriteItems.findIndex(
      (item) => item.foodId === $modalTitleP.dataset.id
    );
    if (index !== -1) {
      favoriteItems.splice(index, 1);
    } // storageItem 배열에서 지우기
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));

    // 비활성화된 상태에서 누르면
  } else if (e.target.classList.contains("unfavorite")) {
    // 아이콘 및 텍스트 스타일 변경
    isToBeUnfavorite = false;
    toggleIconAndTextForFavorite(isToBeUnfavorite);
    // local storage에 제품명 상태 저장하기!!
    //      1. 필요한 값을 담은 객체 만들기

    const favoriteItemDetail = {
      foodName,
      foodId: id,
      foodManufacturer: manufacturer || "- ",
      foodCategory: category,
    };
    favoriteItems.push(favoriteItemDetail);
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
    console.log(favoriteItems);
  }
}
// 2. 서브 이벤트 핸들러(아이콘 및 텍스트 변경)
function toggleIconAndTextForFavorite(isToBeUnfavorite) {
  if (isToBeUnfavorite) {
    // 아이콘 변경
    $favoriteIcon.style.display = "none";
    $unfavoriteIcon.style.display = "block";
    // 일정 시간 동안 즐겨찾기 안내 span 보이기
    $favoriteSpan.style.display = "none"; // 등록&해제 연속으로 누를 시 멘트 안 보이게
    $unfavoriteSpan.style.display = "inline";
    setTimeout(function () {
      $unfavoriteSpan.style.display = "none";
    }, 700);
  } else {
    $unfavoriteSpan.style.display = "none"; // 등록&해제 연속으로 누를 시 멘트 안 보이게
    $favoriteIcon.style.display = "block";
    $unfavoriteIcon.style.display = "none";
    $favoriteSpan.style.display = "inline";
    setTimeout(function () {
      $favoriteSpan.style.display = "none";
    }, 700);
  }
}

// 즐겨찾기 상태 불러오기 이벤트
//   1. local storage에서 상태 찾아와서
function loadFavoriteStatusHandler(e) {
  favoriteItemsStorage =
    JSON.parse(localStorage.getItem("favoriteItems")) || {};

  // favoriteItemsStorage가 비어 있으면 바로 리턴
  if (Object.keys(favoriteItemsStorage).length === 0) {
    return;
  }

  // 2. 모달을 열었을 때 나오는 제목이랑 favoriteItems 이랑 비교해서 일치하는 값이 있으면
  const productId = document.querySelector(".modal-title p").dataset.id;
  if (favoriteItemsStorage.find((item) => item.foodId === productId)) {
    console.log("일치");
    // favorite 으로 저장
    $favoriteIcon.style.display = "block";
    $unfavoriteIcon.style.display = "none";
  }
}

// ## 즐겨찾기 목록 불러오기 이벤트 ##
// 1. 메인 이벤트 핸들러 
function displayFavoritesHandler(e) {
  // !! 즐겨찾기 목록 불러오고 있을 때는 사용자가 새로운 값 입력할때까지 search 기능 안 되게(충돌 방지)
  clearTimeout(timeoutId);

  // storage에 저장된 즐겨찾기 목록 오기
  // !!! 최신 상태로 업데이트해서 가져올 것!!
  favoriteItemsStorage = JSON.parse(localStorage.getItem("favoriteItems")) || [];
  console.log(favoriteItemsStorage);
  // 검색 결과 없을 때 효과는 작동 안하게 하고
  $noResult.style.display = "none";
  $resultDiv.classList.remove("when-no-result");

  // 내용 초기화 하고
  $resultDiv.innerHTML = "";

  $resultDiv.style.display = "block"; // 즐겨찾기 목록을 보여주기 위해 display 설정(기본 세팅이 none임)
  $mainContainerTextBox.classList.add("search-mode"); // !!! 서치 모드 처럼 텍스트 바 높이 늘려주기

  // 즐겨찾기한 제품이 없으면,
  if (!favoriteItemsStorage.length) {
    //  즐겨찾기 없다고 문구 표시
    const $noFavoriteDiv = document.createElement("div");
    $resultDiv.style.display = "block"; // 즐겨찾기 목록을 보여주기 위해 display 설정(기본 세팅이 none임)
    $noFavoriteDiv.innerHTML = `
          <div class="product-card">
            <p class="no-favorite-item">  즐겨찾기가 없어요ㅠㅠ!!!!</p>
          </div>
          `;
    $resultDiv.append($noFavoriteDiv);
    return;
  }

  // storage에 저장된 즐겨찾기 목록 가져와서, 화면에 표시
  console.log("favoriteItemsStorage");
  console.log(favoriteItemsStorage);
  favoriteItemsStorage.forEach((item) => {
    const $newProductCardDiv = createProductCard(item);
    $resultDiv.append($newProductCardDiv);
  });
}

// 2. 서브 핸들러 - product card 의 html 생성
function createProductCard(item) {
  const $newDiv = document.createElement("div");
  $newDiv.classList.add("product-card");
  $newDiv.dataset.foodName = item.foodName;
  $newDiv.dataset.code = item.foodId;
  $newDiv.dataset.manufacturer = item.foodManufacturer;
  $newDiv.dataset.category = item.foodCategory;
  console.log('foodManufacturer 체크');
  console.log(item.foodManufacturer);

  $newDiv.innerHTML = `<span class="foodName">${item.foodName} (${
    item.foodManufacturer == null ? "업체명: " + item.foodManufacturer : "구분: " + item.foodCategory
  })</span>`;
  
  return $newDiv;
}

// =================== 푸드 랜덤 선택 게임 ===============
// 검색 결과 모달만 나오는 이벤트
async function showFoodGameModal(e) {
  isFoodGameMode = true; // esc 버튼 용
  document.querySelector(".food-game-modal.hidden").style.display = "flex"; // 모달 활성화
}

function playRandomFoodGame(e) {
  randomFood(); // 랜덤 푸드 선택해서
  startSlothMachine(); // 돌리다가 보여주기
}

// 게임 모달 클로즈 이벤트
// 1. close 버튼
function closeGameModal(e) {
  // 모달 비활성화
  document.querySelector(".food-game-modal.hidden").style.display = "none";
}

// 2. 모달 활성화 상태에서 esc
async function escCloseGameModal(e) {
  if (!isFoodGameMode) return; // 모달 활성화상태에서만 작동
  if (e.key !== "Escape") return;
  closeGameModal();
  isModalMode = false;
}

// ================ 이벤트 등록 ================== //
// 검색 이벤트 (1) : 버튼 클릭 했을 때
$searchBtn.addEventListener("click", searchProduct);
// 검색 이벤트 (2) : input에서 입력할 때;
$productNameInput.addEventListener("input", debounce(searchProduct, 300));
// 검색 이벤트 (3) : input 에서 enter 누를 때
$productNameInput.addEventListener("keydown", productNameInputAndEnterHandler);

// 결과 상세보기 이벤트
$resultDiv.addEventListener("click", showDetail);

// 결과 상세보기 close 이벤트 (1) 클로즈 버튼 누를 시
$modalCloseBtn.addEventListener("click", closeModal);

// 결과 상세보기 close 이벤트 (2) 모달 열린 상태에서 esc 누를 시
document.addEventListener("keydown", escCloseModal);

// 모달 바디에 마우스 스크롤 시 가로 스크롤바 롤링 효과
document
  .querySelector(".modal-body")
  .addEventListener("wheel", modalBodyHorizontalScrollHandler);

// 즐겨찾기 버튼 이벤트
document
  .querySelector(".modal-header")
  .addEventListener("click", toggleFavorite);

// 즐겨찾기 상태 불러오기 이벤트
window.addEventListener("load", loadFavoriteStatusHandler);

// 즐겨찾기 목록 보기 버튼 이벤트
document
  .querySelector(".bookmark-check-button")
  .addEventListener("click", displayFavoritesHandler);

// 푸드 랜덤 선택 게임 이벤트 모달 열기
document
  .querySelector(".today-button")
  .addEventListener("click", showFoodGameModal);

// 게임 종료 버튼 이벤트 (1) 클로즈 버튼 누를 시
document
  .querySelector(".food-game-close-btn")
  .addEventListener("click", closeGameModal);

// 게임 종료 버튼 이벤트 (2) 모달 열린 상태에서 esc 누를 시
document.addEventListener("keydown", escCloseGameModal);

document
  .querySelector(".generate-food-button")
  .addEventListener("click", playRandomFoodGame);
