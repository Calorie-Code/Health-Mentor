const $linkTreeBtn = document.querySelectorAll(".link-button");
const $modalOverlay = document.getElementById("modal-overlay");
const $modalContainer = document.getElementById("modal-container");
const $modalCloseBtn = document.querySelector(".modal-close-btn");

// ===== 이벤트 리스너 등록 ====
// 링크 버튼 클릭하면 모달 띄우기
console.log($linkTreeBtn);
$linkTreeBtn.forEach(($btn) =>
  $btn.addEventListener("click", modalDisplayHandler)
);
// 모달 띄운 상태에서 x 누르면 모달 없애기
$modalCloseBtn.addEventListener("click", modalCloseHandler);
// 모달 띄운 상태에서 esc 누르면 모달 없애기
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  modalCloseHandler();
});


// ========== 이벤트 핸들러 함수 ===========
//  모달 띄우기
function modalDisplayHandler(e) {
  // 모달 숨기기 해제
  $modalOverlay.classList.add("show");
  $modalContainer.classList.add("show");
  // 동영상 주소 변수
  const videos = {
    video1: [
      `<iframe src="https://www.youtube.com/embed/VtgvkG8e2go" title="마음의 치유 휴식을 가져다 주는 싱그러운 빗소리 asmr" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      `<iframe src="https://www.youtube.com/embed/dj3iRJaDhOw" title="쉴새없이 쏟아지는 폭우빗소리, 생각을 비우고 바로 잠들게하는 빗소리 - ASMR 잠오는 백색소음, relax, study, meditation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      `<iframe src="https://www.youtube.com/embed/lQ0fS2meTYQ" title="불면증에 좋은 최고의 빗소리 10분이내 수면 백색소음 자장가 ASMR | Rain Sounds For Sleeping, White Noise" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    ],
    video2: [
      `<iframe src="https://www.youtube.com/embed/XvcbDf7HcI4" title="9월의 첫명상 [10분🌳숲속치유명상🧘🏻‍♂️] 복잡하고 피곤한 머리를 즉시 편안하게 치유하는 제주 한라산 숲속치유명상 10분으로, 21일동안 매일 반복하셔서 고요와 평화를 내것으로" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      `<iframe src="https://www.youtube.com/embed/Zj8afPv0FVw" title="[응용명상]진정한 나를 만나요, 숲과 함께하는 명상" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      `<iframe src="https://www.youtube.com/embed/RTj5IeA432Y" title="숲속에서 듣는 힐링음악☁편안한 휴식음악,스트레스 해소음악,명상음악 - &quot;In The Woods&quot;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    ],
    video3: [
      `<iframe src="https://www.youtube.com/embed/O0DQqH5QATY" title="파도소리 들으며 명상하기🧘‍♀️ 동해바다 1시간ㅣ 10분 30분 싱잉볼 중간 알람" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      `<iframe src="https://www.youtube.com/embed/n4Mdh3TEq_k" title="힘든 하루를 위로하는 푸른 파도 소리 바다 ASMR 🌊 불면증 수면 스트레스 완화를 위한 자연의 소리" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      `<iframe src="https://www.youtube.com/embed/BU9MMwnrqMM" title="쉬운 마음챙김 호흡명상 가이드 ㅣ 파도소리 들으며 함께 명상하기" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    ],
    video4: [
      `<iframe src="https://www.youtube.com/embed/LlPPjUz7ONs" title="☃️🚶‍♀️ 눈길을 걷다가 고요한 잠을 청하는 겨울 감성 수면 스토리 명상, 마음의 위안을 주는 겨울 동화 이야기 [BSM Level 1 - 몸과 마음의 안정]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      `<iframe src="https://www.youtube.com/embed/S0bgJ31QgPs" title="눈 내리는 숲속 싱잉볼 명상음악 1시간 (치유,숙면,명상요가용) Singing bowl meditation in the snowy forest -healing,yoga" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      `<iframe src="https://www.youtube.com/embed/JNJt8xR_K5o" title="[직곡의 명상TV] 눈오는 날 5분 명상" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    ],
  };
  // 동영상 선택
  //   1. 클릭한 버튼의 data-video 값 가져오기
  const selectedVideoKey = e.target.getAttribute("data-video");
  const selectedVideoArr = videos[selectedVideoKey];

  //   2. 비디오 url 가져오기
  const randomIndex = Math.floor(Math.random() * selectedVideoArr.length);
  const selectedVideo = selectedVideoArr[randomIndex];
  // 동영상 띄우기
  const $iframeContainer = document.querySelector(".iframe-container");
  $iframeContainer.innerHTML = selectedVideo;
}
// 모달 닫기
function modalCloseHandler(e) {
  $modalOverlay.classList.remove("show");
  $modalContainer.classList.remove("show");
}
