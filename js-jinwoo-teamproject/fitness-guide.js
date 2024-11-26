// DOM 요소 가져오기
const genderInput = document.getElementById("gender");
const ageInput = document.getElementById("age");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const summaryGender = document.getElementById("summary-gender");
const summaryAge = document.getElementById("summary-age");
const summaryHeight = document.getElementById("summary-height");
const summaryWeight = document.getElementById("summary-weight");

// 이벤트 리스너 추가
genderInput.addEventListener("change", () => {
    summaryGender.textContent = genderInput.value;
});

ageInput.addEventListener("input", () => {
    summaryAge.textContent = ageInput.value || "미입력";
});

heightInput.addEventListener("input", () => {
    summaryHeight.textContent = heightInput.value || "미입력";
});

weightInput.addEventListener("input", () => {
    summaryWeight.textContent = weightInput.value || "미입력";
});
