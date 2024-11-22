    // =============전역 변수 =============== //
    // API 주소
    const apiKey =
      "ccStZzcWOtwXEPyP7883p9z3cpgynAtuqu2jduhjkmFE0POBfxWkCOAvSjMPvqOeJgAK8IgXTzwo%2B6rZfQduZQ%3D%3D";
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
    const $unfavoriteIcon = document.querySelector('.modal-header i.unfavorite');
    const $favoriteIcon = document.querySelector('.modal-header i.add-to-favorite');
    const $favoriteSpan = document.querySelector('.modal-header span.favorite');
    const $unfavoriteSpan = document.querySelector('.modal-header span.unfavorite');

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
        document.querySelector('.modal-header i.unfavorite').style.display = 'block';
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
      let data = [Math.round(selectedItem), recommendedDailyConsumptionForWoman, recommendedDailyConsumptionForMan];

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
      myChart2 = createOtherChart("myChart2", carbo, "탄수화물", 324, "g", servingSize, chartWidth, chartHeight, fontSize, fontFamily);

      // Chart 3 - 당류
      if (myChart3) myChart3.destroy();
      myChart3 = createOtherChart("myChart3", sugar, "당류", 100, "g", servingSize, chartWidth, chartHeight, fontSize, fontFamily);

      // Chart 4 - 지방
      if (myChart4) myChart4.destroy();
      myChart4 = createOtherChart("myChart4", fat, "지방", 54, "g", servingSize, chartWidth, chartHeight, fontSize, fontFamily);

      // Chart 5 - 트랜스지방
      if (myChart5) myChart5.destroy();
      myChart5 = createOtherChart("myChart5", transFat, "트랜스지방", 2, "g", servingSize, chartWidth, chartHeight, fontSize, fontFamily);

      // Chart 6 - 포화지방
      if (myChart6) myChart6.destroy();
      myChart6 = createOtherChart("myChart6", saturatedFat, "포화지방", 15, "g", servingSize, chartWidth, chartHeight, fontSize, fontFamily);

      // Chart 7 - 콜레스테롤
      if (myChart7) myChart7.destroy();
      myChart7 = createOtherChart("myChart7", cholesterol, "콜레스테롤", 300, "mg", servingSize, chartWidth, chartHeight, fontSize, fontFamily);

      // Chart 8 - 단백질
      if (myChart8) myChart8.destroy();
      myChart8 = createOtherChart("myChart8", protein, "단백질", 55, "g", servingSize, chartWidth, chartHeight, fontSize, fontFamily);
    }  
    function createOtherChart(chartId, selectedItem, chartTitle, recommendedDailyConsumption, chartUnit, servingSize, chartWidth, chartHeight, fontSize, fontFamily) {
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
              datalabels: {  // 첫 번째 데이터셋에만 datalabels 설정
                anchor: "end",
                align: "top",  // 첫 번째 막대 위에 값을 표시
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
              datalabels: {  // 두 번째 데이터셋에 datalabels 설정
                anchor: "end",
                align: "bottom",  // 두 번째 막대 아래에 값을 표시
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



    // ================= 이벤트 핸들러 ================== //
    // 검색 이벤트
    async function searchProduct(e) {
    
      // input 박스 사용자 입력값 가져오기
      const inputFood = $productNameInput.value;
      const url = `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo01/getFoodNtrCpntDbInq01?serviceKey=${apiKey}&pageNo=${pageNo}&numOfRows=${numberOfRows}&type=json&FOOD_NM_KR=${inputFood}`;

      // 2. 식약처 DB API 검색
      const response = await fetch(url);
      const apiData = await response.json();
      const searchResult = apiData.body.items;
      // console.log(searchResult);

      // !! searchResult가 없다 == 검색결과가 없음
      //  => 검색 결과 없을 때 효과
      if (!searchResult || searchResult.length === 0) {
        $noResult.style.display = "block";
        $resultDiv.innerHTML = "";
        $resultDiv.classList.add("when-no-result");
        return;
      }
      // 검색 결과 있으면 바로 위에서 했단 효과 제거 하기
      $noResult.style.display = "none";
      $resultDiv.classList.remove("when-no-result");


      // 기존 결과 누적 방지
      $resultDiv.innerHTML = "";

      // 3. 검색 결과에서 각 항목 잡아오기 & 태그 생성
      searchResult.forEach((item) => {
        // destructuring
        let { FOOD_NM_KR: foodName, FOOD_CD: code, MAKER_NM: manufacturer } = item;

        // 업체명 표기 용
        manufacturerText = manufacturer || "- ";

        // 태그 생성하기
        $newDiv = document.createElement("div");
        $newDiv.classList.add("product-card");
        $newDiv.dataset.foodName = foodName;
        $newDiv.dataset.code = code;
        $newDiv.innerHTML = `<span class="foodName">${foodName} (업체명: ${manufacturerText})</span>`;
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

    // 검색 결과 나오는 이벤트
    async function showDetail(e) {
      console.log(e.target);
 
      if (
        e.target.classList.contains("product-card") ||
        e.target.classList.contains("when-no-result") ||
        e.target.classList.contains("no-favorite-item") ||
        e.target.classList.contains("result")
      )
      return;

        console.log(e.target.lastChildElement);

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
      console.log('kkk');
      console.log(searchResult);
      // 3. 제품 코드까지 같은 제품으로 찾기
      console.log('kkk');
      console.log($closestProductCard);
      const finalResult = searchResult.find(
        (item) => item.FOOD_CD === $closestProductCard.dataset.code
      );
      // 4. 정보 destructuring
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
      } = finalResult;

      // 6. 내용 모달에 집어넣기
      isLoading = false;
      detailedInfoSectionLoadingToggle(); // 로딩 멘트 및  로딩 아이콘 활성화
      console.log($title);
      $title.textContent = `${foodName} (업체명: ${manufacturer || '- '})`;
      $title.dataset.foodName = foodName; // 즐겨찾기 불러올 때 쓰는 용
      $title.dataset.id = code; // 즐겨찾기 불러올 때 쓰는 용
        // localStorage에서 즐겨찾기 상태 가져와서 즐겨찾기 버튼 활성화 하기
        loadFavoriteStatusHandler();

      // 차트 업데이트
      createChart(finalResult);
      
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

    // favorite 버튼
    function toggleFavorite(e) {
      // 즐겨찾기 활성화 된 상태에서 누르면
      if (e.target.classList.contains('add-to-favorite')) {
        // 아이콘 변경
        $favoriteIcon.style.display = "none";
        $unfavoriteIcon.style.display = "block";
        // 일정 시간 동안 즐겨찾기 안내 span 보이기
        $favoriteSpan.style.display = "none"; // 등록&해제 연속으로 누를 시 멘트 안 보이게
        $unfavoriteSpan.style.display = "inline";
        setTimeout(function() {
          $unfavoriteSpan.style.display = 'none';
        }, 1000);
        // local storage에서 지우기!!
        let index = favoriteItems.findIndex(item => item.foodId === document.querySelector('.modal-title p').dataset.id);
        if (index !== -1) {
          favoriteItems.splice(index, 1)
        } // storageItem 배열에서 지우기
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));

        // 비활성화된 상태에서 누르면
      } else if (e.target.classList.contains('unfavorite')) {
        $unfavoriteSpan.style.display = "none"; // 등록&해제 연속으로 누를 시 멘트 안 보이게
        $favoriteIcon.style.display = "block";
        $unfavoriteIcon.style.display = "none";
        // 일정 시간 동안 즐겨찾기 안내 span 보이기
        $favoriteSpan.style.display = "inline";
        setTimeout(function() {
          $favoriteSpan.style.display = 'none';
        }, 1000);
          // local storage에 제품명 상태 저장하기!!
          //      1. 필요한 값을 담은 객체 만들기
          const favoriteItemDetail = {
            foodName: document.querySelector('.modal-title p').dataset.foodName,
            foodId: document.querySelector('.modal-title p').dataset.id,
            foodManufacturer: document.querySelector('.modal-title p').dataset.manufacturer || '- ',
          }
          favoriteItems.push(favoriteItemDetail);
          localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));

        }
    }


    // 즐겨찾기 상태 불러오기 이벤트
    //   1. local storage에서 상태 찾아와서
    function loadFavoriteStatusHandler(e) {
      favoriteItemsStorage = JSON.parse(localStorage.getItem('favoriteItems')) || {};  
      // 2. 모달을 열었을 때 나오는 제목이랑 favoriteItems 이랑 비교해서 일치하는 값이 있으면
      const productId = document.querySelector('.modal-title p').dataset.id;
      if (favoriteItemsStorage.find(item => item.foodId === productId)) {
        console.log('일치');
        // favorite 으로 저장
        $favoriteIcon.style.display = "block";
        $unfavoriteIcon.style.display = "none";
      }
    };


    // 즐겨찾기 목록 불러오기 이벤트
    function displayFavoritesHandler(e) {
      // !! 즐겨찾기 목록 불러오고 있을 때는 사용자가 새로운 값 입력할때까지 search 기능 안 되게(충돌 방지)
      clearTimeout(timeoutId);

      // storage에 저장된 즐겨찾기 목록 오기
      // !!! 최신 상태로 업데이트해서 가져올 것!! 
      favoriteItemsStorage = JSON.parse(localStorage.getItem('favoriteItems')) || {};  
      // 검색 결과 없을 때 효과는 작동 안하게 하고
      $noResult.style.display = "none";
      $resultDiv.classList.remove("when-no-result");

      // 내용 초기화 하고
      $resultDiv.innerHTML = '';

      $resultDiv.style.display = "block";  // 즐겨찾기 목록을 보여주기 위해 display 설정(기본 세팅이 none임)
      $mainContainerTextBox.classList.add('search-mode') // !!! 서치 모드 처럼 텍스트 바 높이 늘려주기

      // 즐겨찾기한 제품이 없으면,
      if (favoriteItemsStorage.length === 0) {
        //  즐겨찾기 없다고 문구 표시
        const $noFavoriteDiv = document.createElement('div');
        $resultDiv.style.display = "block";  // 즐겨찾기 목록을 보여주기 위해 display 설정(기본 세팅이 none임)
        $noFavoriteDiv.innerHTML = `
          <div class="product-card">
            <p class="no-favorite-item">  즐겨찾기가 없어요ㅠㅠ!!!!</p>
          </div>
          `;
        $resultDiv.append($noFavoriteDiv);
        return;
      }

    

      // storage에 저장된 즐겨찾기 목록 가져와서, 화면에 표시
      console.log(favoriteItemsStorage);
      console.log($resultDiv);
      favoriteItemsStorage.forEach(item => {
        console.log('테스트');
        $newDiv = document.createElement("div");
        $newDiv.classList.add("product-card");
        $newDiv.dataset.foodName = item.foodName;
        $newDiv.dataset.code = item.foodId;
        $newDiv.innerHTML = `<span class="foodName">${item.foodName} (업체명:${item.manufacturer || '- '})</span>`;
        $resultDiv.append($newDiv);
      })
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
    document.querySelector('.modal-body').addEventListener('wheel', modalBodyHorizontalScrollHandler);

    // 즐겨찾기 버튼 이벤트
    document.querySelector('.modal-header').addEventListener('click', toggleFavorite);

    // 즐겨찾기 상태 불러오기 이벤트
    window.addEventListener('load', loadFavoriteStatusHandler);

    // 즐겨찾기 목록 보기 버튼 이벤트
    document.querySelector('.bookmark-check-button').addEventListener('click', displayFavoritesHandler);