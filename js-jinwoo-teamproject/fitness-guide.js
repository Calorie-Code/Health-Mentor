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
