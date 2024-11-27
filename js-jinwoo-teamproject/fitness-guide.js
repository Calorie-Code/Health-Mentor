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





// // BMI 계산 버튼
// const calculateBmiButton = document.getElementById("calculate-bmi");

// // BMI 결과 출력 영역
// const bmiValueSpan = document.getElementById("bmi-value");
// const bmiStatusSpan = document.getElementById("bmi-status");

// // BMI 계산 함수
// function calculateBMI() {
//     const heightInput = document.getElementById("height").value;
//     const weightInput = document.getElementById("weight").value;

    
//     if (!heightInput || !weightInput || heightInput <= 0 || weightInput <= 0) {
//         alert("신장과 몸무게를 올바르게 입력하세요.");
//         return;
//     }

//     const heightInMeters = heightInput / 100; // cm -> m 변환
//     const bmi = (weightInput / (heightInMeters ** 2)).toFixed(2);

//     let status = "";
//     if (bmi < 18.5) {
//         status = "저체중";
//     } else if (bmi >= 18.5 && bmi < 24.9) {
//         status = "정상 체중";
//     } else if (bmi >= 25 && bmi < 29.9) {
//         status = "과체중";
//     } else {
//         status = "비만";
//     }

//     // 결과 업데이트
//     bmiValueSpan.textContent = bmi;
//     bmiStatusSpan.textContent = status;
// }

// // 이벤트 리스너
// calculateBmiButton.addEventListener("click", calculateBMI);








// BMI 계산 버튼
const calculateBmiButton = document.getElementById("calculate-bmi");

// BMI 결과 출력 영역
const bmiValueSpan = document.getElementById("bmi-value");
const bmiStatusSpan = document.getElementById("bmi-status");

// BMI 계산 함수
function calculateBMI() {
    const heightInput = document.getElementById("height").value;
    const weightInput = document.getElementById("weight").value;

    // 입력값 검증
    if (!heightInput || !weightInput || heightInput <= 0 || weightInput <= 0) {
        alert("신장과 몸무게를 올바르게 입력하세요.");
        return;
    }

    const heightInMeters = heightInput / 100; // cm -> m 변환
    const bmi = (weightInput / (heightInMeters ** 2)).toFixed(2); // BMI 계산 (소수점 2자리)

    let status = "";
    let bmiColor = ""; // 상태에 따른 색상

    // BMI 상태 및 색상 설정
    if (bmi < 18.5) {
        status = "저체중";
        bmiColor = "#007BFF"; // 파란색
    } else if (bmi >= 18.5 && bmi < 23) {
        status = "정상 체중";
        bmiColor = "#32CD32"; // 연두색
    } else if (bmi >= 23 && bmi < 25) {
        status = "과체중";
        bmiColor = "#FFA500"; // 주황색
    } else {
        status = "비만";
        bmiColor = "#FF0000"; // 빨간색
    }

    // 결과 업데이트
    bmiValueSpan.textContent = bmi;
    bmiStatusSpan.textContent = status;

    // 색상 및 굵기 변경
    bmiValueSpan.style.color = bmiColor;
    bmiValueSpan.style.fontWeight = "bold"; // 폰트 굵게
    bmiStatusSpan.style.color = bmiColor;
    bmiStatusSpan.style.fontWeight = "bold"; // 폰트 굵게
}

// 이벤트 리스너
calculateBmiButton.addEventListener("click", calculateBMI);







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
