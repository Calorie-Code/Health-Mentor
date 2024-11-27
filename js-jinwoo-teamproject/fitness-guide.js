// 모든 운동영상보기 버튼 가져오기
const videoButtons = document.querySelectorAll(".exercise-card button");

// 모달 컨테이너 및 닫기 버튼, YouTube iframe 가져오기
const modalContainer = document.querySelector(".modal-container");
const closeModalButton = document.querySelector(".modal-close-btn");
const youtubeFrame = document.querySelector(".youtube-frame");

// 운동별 YouTube URL 매핑
const videoURLs = {
    // 맨몸 운동
    "푸쉬업": "https://www.youtube.com/embed/-_DUjHxgmWk",
    "딥스": "https://www.youtube.com/embed/pQSfXvaQGas",
    "턱걸이": "https://www.youtube.com/embed/nWhS28U6bCY",
    "스쿼트": "https://www.youtube.com/embed/Fk9j6pQ6ej8",
    "런지": "https://www.youtube.com/embed/NZcwOWUkBt4",
    "윗몸일으키기": "https://www.youtube.com/embed/0PgmYmjnoM8",
    "크런치": "https://www.youtube.com/embed/KqnFav4Edvw",
    "AB 롤아웃": "https://www.youtube.com/embed/1UgKKfs0JCA",
    "플랭크": "https://www.youtube.com/embed/Zq8nRY9P_cM",
    "브리지": "https://www.youtube.com/embed/IDu9N1yi4ts",
    
    // 도구 운동
    "데드리프트": "https://www.youtube.com/embed/EBjYQeeBI-0",
    "도구 스쿼트": "https://www.youtube.com/embed/lI6Z6VIhOR4",
    "벤치프레스": "https://www.youtube.com/embed/-1EKK3FWCzg",
    "풀오버": "https://www.youtube.com/embed/2UDakeTa9Rc",
    "플라이": "https://www.youtube.com/embed/9Hw3g4_Mydw",
    "슈러그": "https://www.youtube.com/embed/WAbyatn4APE",
    "업라이트 로우": "https://www.youtube.com/embed/D3smElJ7Uhw",
    "덤벨 로우": "https://www.youtube.com/embed/2i1v1UvsP_w",
    "도구 런지": "https://www.youtube.com/embed/mWg_QJcmJqc",
    "래터럴 레이즈": "https://www.youtube.com/embed/u_XiJWkPkj4",
    "프레스": "https://www.youtube.com/embed/xTQL6jvVMNA",
    "라잉 트라이셉스 익스텐션": "https://www.youtube.com/embed/QG0JbDaROwk",
    "리스트 컬": "https://www.youtube.com/embed/L-SfEPBlFCM",
    "덤벨 사이드 벤드": "https://www.youtube.com/embed/8VWROqyuJeg",
    "힙 쓰러스트": "https://www.youtube.com/embed/ZJMOZIE2FYo",
    "카프 레이즈": "https://www.youtube.com/embed/Xpts5Tvu9_U",

    // 추가된 운동
    "체스트프레스": "https://www.youtube.com/embed/NoQ27VKgnvA",
    "기구 체스트 플라이": "https://www.youtube.com/embed/1pBcQ-77ho4",
    "케이블크로스오버": "https://www.youtube.com/embed/_FUhaghu_ds",
    "시티드케이블로우": "https://www.youtube.com/embed/b_seZMf3MfM",
    "랫 풀 다운": "https://www.youtube.com/embed/G11ySWVXA48",
    "스트레이트 암 풀 다운": "https://www.youtube.com/embed/cRUb338a7zA",
    "레그 프레스": "https://www.youtube.com/embed/hYwJrXpzEfs",
    "레그 익스텐션": "https://www.youtube.com/embed/mS9iwXhycJI",
    "레그 컬": "https://www.youtube.com/embed/9w8d_EL-7e4",
    "바이셉스 컬": "https://www.youtube.com/embed/Dlg0W_5mq98",
    "트라이셉스 푸시 다운": "https://www.youtube.com/embed/cF9NczPANp4"
};


// 버튼 클릭 이벤트
videoButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // 운동 이름 가져오기 (버튼 이전 형제 요소의 <div> 내용)
        const exerciseName = button.previousElementSibling.querySelector("div").textContent.trim();

        // 운동 이름에 해당하는 YouTube URL 가져오기
        const videoURL = videoURLs[exerciseName];

        if (videoURL) {
            // YouTube URL 설정
            youtubeFrame.src = videoURL;

            // 모달 창 표시
            modalContainer.style.display = "flex";
        } else {
            console.error(`URL을 찾을 수 없습니다: ${exerciseName}`);
        }
    });
});

// 닫기 버튼 클릭 이벤트
closeModalButton.addEventListener("click", closeModal);

// Esc 키를 눌렀을 때 모달 닫기 이벤트
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// 모달 닫기 함수
function closeModal() {
    // 모달 창 숨기기
    modalContainer.style.display = "none";

    // YouTube 영상 중지
    youtubeFrame.src = "";
}









// "맨 위로 가기" 버튼 가져오기
const scrollToTopButton = document.getElementById("scroll-to-top");

// 스크롤 이벤트 감지
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollToTopButton.classList.add("show");
  } else {
    scrollToTopButton.classList.remove("show");
  }
});

// 버튼 클릭 이벤트
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // 부드럽게 스크롤
  });
});

// 운동 추천 출력 영역
const customAdviseDiv = document.querySelector(".customadvise");

// 나이에 따른 운동 추천 함수
function recommendExercise(age) {
    let recommendation = "";

    if (age >= 10 && age <= 20) {
        recommendation = "고강도 유산소 운동(달리기, 줄넘기, 축구) + 근력 운동(웨이트 트레이닝, 맨몸운동: 푸쉬업, 스쿼트)";
    } else if (age >= 30 && age <= 40) {
        recommendation = "유산소(빠르게 걷기, 등산) + 근력 운동(저중량 고반복 운동, 플랭크)";
    } else if (age >= 50 && age <= 60) {
        recommendation = "저강도 유산소(걷기, 수영, 실내자전거) + 관절 강화 운동(요가, 필라테스, 균형 운동)";
    } else if (age >= 70) {
        recommendation = "관절에 부담 없는 운동(워터 에어로빅, 스트레칭, 가벼운 걷기) + 유연성 운동(요가, 태극권)";
    } else {
        recommendation = "운동 추천이 어렵습니다. 정확한 나이를 입력해주세요.";
    }

    // 마지막 문구 추가
    recommendation += "<br><strong>자신의 체력이나 컨디션에 따라서 운동의 강도와 종류를 맞춰서 운동하세요!</strong>";

    return recommendation;
}

// BMI와 운동 추천 결과 처리 함수
function calculateBMI() {
    const heightInput = document.getElementById("height").value;
    const weightInput = document.getElementById("weight").value;
    const ageInput = document.getElementById("age").value; // 나이 입력 값 가져오기

    if (!heightInput || !weightInput || !ageInput || heightInput <= 0 || weightInput <= 0 || ageInput <= 0) {
        alert("신장, 몸무게, 나이를 올바르게 입력하세요.");
        return;
    }

    // BMI 계산
    const heightInMeters = heightInput / 100; // cm -> m 변환
    const bmi = (weightInput / (heightInMeters ** 2)).toFixed(2);

    let status = "";
    if (bmi < 18.5) {
        status = "저체중";
    } else if (bmi >= 18.5 && bmi < 23.0) {
        status = "정상 체중";
    } else if (bmi >= 23.0 && bmi < 25.0) {
        status = "과체중";
    } else {
        status = "비만";
    }

    // BMI 결과 업데이트
    bmiValueSpan.textContent = bmi;
    bmiStatusSpan.textContent = status;

    // BMI 스타일 적용
    bmiValueSpan.style.fontWeight = "bold";
    bmiStatusSpan.style.fontWeight = "bold";

    if (bmi < 18.5) {
        bmiValueSpan.style.color = "blue";
        bmiStatusSpan.style.color = "blue";
    } else if (bmi >= 18.5 && bmi < 23.0) {
        bmiValueSpan.style.color = "green";
        bmiStatusSpan.style.color = "green";
    } else if (bmi >= 23.0 && bmi < 25.0) {
        bmiValueSpan.style.color = "orange";
        bmiStatusSpan.style.color = "orange";
    } else {
        bmiValueSpan.style.color = "red";
        bmiStatusSpan.style.color = "red";
    }

    // 나이에 따른 운동 추천
    const exerciseRecommendation = recommendExercise(Number(ageInput));

    // 운동 추천 업데이트
    customAdviseDiv.innerHTML = exerciseRecommendation;
    customAdviseDiv.style.color = "#3f3f3f"; // 진한 회색
    customAdviseDiv.style.fontWeight = "bold";
}



// // BMI 계산 버튼
// const calculateBmiButton = document.getElementById("calculate-bmi");

// // BMI 결과 출력 영역
// const bmiValueSpan = document.getElementById("bmi-value");
// const bmiStatusSpan = document.getElementById("bmi-status");

// // 운동 추천 영역
// const recommendationText = document.getElementById("recommendation-text");

// // BMI 계산 및 운동 추천 함수
// function calculateBMI() {
//     const heightInput = document.getElementById("height").value;
//     const weightInput = document.getElementById("weight").value;
//     const ageInput = document.getElementById("age").value;

//     // 입력값 검증
//     if (!heightInput || !weightInput || !ageInput || heightInput <= 0 || weightInput <= 0 || ageInput <= 0) {
//         alert("신장, 몸무게, 나이를 올바르게 입력하세요.");
//         return;
//     }

//     const heightInMeters = heightInput / 100; // cm -> m 변환
//     const bmi = (weightInput / (heightInMeters ** 2)).toFixed(2);

//     // BMI 상태 판단
//     let status = "";
//     if (bmi < 18.5) {
//         status = "저체중";
//     } else if (bmi >= 18.5 && bmi < 23.0) {
//         status = "정상 체중";
//     } else if (bmi >= 23.0 && bmi < 25.0) {
//         status = "과체중";
//     } else {
//         status = "비만";
//     }

// // 결과 업데이트
// bmiValueSpan.textContent = bmi;
// bmiStatusSpan.textContent = status;

// // BMI에 따른 색상 및 스타일 적용
// if (bmi < 18.5) {
//     bmiValueSpan.style.color = "blue";
//     bmiStatusSpan.style.color = "blue";
// } else if (bmi >= 18.5 && bmi < 23.0) {
//     bmiValueSpan.style.color = "green";
//     bmiStatusSpan.style.color = "green";
// } else if (bmi >= 23.0 && bmi < 25.0) {
//     bmiValueSpan.style.color = "orange";
//     bmiStatusSpan.style.color = "orange";
// } else {
//     bmiValueSpan.style.color = "red";
//     bmiStatusSpan.style.color = "red";
// }

// // 추가된 부분: BMI와 상태를 굵은 글씨로 설정
// bmiValueSpan.style.fontWeight = "bold";
// bmiStatusSpan.style.fontWeight = "bold";






























//     // 운동 추천 로직
//     let recommendation = "";

//     if (ageInput >= 10 && ageInput < 20) {
//         recommendation = "고강도 유산소 운동(달리기, 줄넘기, 축구) + 근력 운동(웨이트 트레이닝, 맨몸운동: 푸쉬업, 스쿼트)";
//     } else if (ageInput >= 30 && ageInput < 40) {
//         recommendation = "유산소(빠르게 걷기, 등산) + 근력 운동(저중량 고반복 운동, 플랭크)";
//     } else if (ageInput >= 50 && ageInput < 60) {
//         recommendation = "저강도 유산소(걷기, 수영, 실내자전거) + 관절 강화 운동(요가, 필라테스, 균형 운동)";
//     } else if (ageInput >= 70) {
//         recommendation = "관절에 부담 없는 운동(워터 에어로빅, 스트레칭, 가벼운 걷기) + 유연성 운동(요가, 태극권)";
//     } else {
//         recommendation = "적합한 운동을 찾지 못했습니다. 전문가와 상담하세요.";
//     }

//     // 최종 문구 추가
//     recommendation += " 자신의 체력이나 컨디션에 따라서 운동의 강도와 종류를 맞춰서 운동하세요!";

//     // 추천 운동 표시
//     recommendationText.textContent = `추천 운동: ${recommendation}`;
//     recommendationText.style.color = "#3f3f3f"; // 진한 회색
//     recommendationText.style.fontWeight = "bold"; // 굵은 글씨
// }

// // 초기 상태 설정
// function resetRecommendationText() {
//     recommendationText.textContent = "운동 추천 결과가 여기에 표시됩니다.";
//     recommendationText.style.color = "#d3d3d3"; // 연한 회색
//     recommendationText.style.fontWeight = "normal"; // 기본 글씨
// }

// // 페이지 로드 시 초기화
// resetRecommendationText();

// // 이벤트 리스너
// calculateBmiButton.addEventListener("click", calculateBMI);






