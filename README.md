
# Health Mentor Project

💡 프로젝트 개요: 웰니스 트렌드에 맞춰 건강한 삶을 유지하기 위한 운동, 식단, 명상 통합 앱 제작

## 1. Git Repository
📁 https://github.com/Calorie-Code

## 2. 프로젝트 기간: 24/11/19 ~ 24/11/28
![image](https://github.com/user-attachments/assets/cad7b0ac-9acf-4702-8fc0-ebdcd5847f9a)


## 3. 👥 프로젝트 멤버 및 역할
#### 1) 성연준 (팀장) [![GitHub Badge](https://img.shields.io/badge/tony24123-007ACC?logo=github&logoColor=white&labelColor=007ACC)](https://github.com/tony24123)
- 역할: 블랙잭 페이지 개발, PPT 기획 및 발표, Github 세팅  

#### 2) 김미정 [![GitHub Badge](https://img.shields.io/badge/mjkim41-FF69B4?logo=github&logoColor=white&labelColor=FF69B4)](https://github.com/mjkim41)
- 역할: 식품영양정보/명상/메인 페이지 개발, 회의록 작성 
  (명상 페이지 아이디어 기획: 김진우, 메인 페이지 디자인 제공: 김진우)  

#### 3) 김진우 [![GitHub Badge](https://img.shields.io/badge/burgerkingzzang-007ACC?logo=github&logoColor=white&labelColor=007ACC)](https://github.com/burgerkingzzang)
- 역할: 운동가이드 페이지 개발, 명상 페이지 아이디어 기획(개발: 김미정), 메인 페이지 디자인 제공 및 CSS 최종 검수(개발: 김미정), PPT 제작  
<br><br>


## 4. ⚙️ Tech Stack with Tools
![HTML5 Badge](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3 Badge](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![ECMAScript 2020 Badge](https://img.shields.io/badge/ECMAScript%202020-000000?logo=javascript&logoColor=white&labelColor=000000)
<br>
![Visual Studio Code 1.95 Badge](https://img.shields.io/badge/Visual%20Studio%20Code_1.95.0-007ACC?logo=visual-studio-code&logoColor=white) ![Windows 11 Badge](https://img.shields.io/badge/Windows%2011-0078D6?logo=windows&logoColor=white) ![Chrome 129 Badge](https://img.shields.io/badge/Chrome%20129-4285F4?logo=googlechrome&logoColor=white)
<br>
![Git 2.47 Badge](https://img.shields.io/badge/Git%202.47-F05032?logo=git&logoColor=white) ![GitHub Badge](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white) ![Discord Badge](https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white)



## 5. 📸 시연
####  1) 🏠 메인 페이지
(디자인 : 김진우, HTML 및 CSS : 김미정)<br>
![](https://velog.velcdn.com/images/kimmy25312/post/e63d1c3d-c2bc-414b-afa0-1e9d38269dc1/image.gif)
<br>
#### 2) 🏋️‍ 운동 가이드
(개발 : 김진우)
![](https://velog.velcdn.com/images/kimmy25312/post/5996b445-47ba-4f68-8c31-383c45501513/image.png)
![](https://velog.velcdn.com/images/kimmy25312/post/2d51e51e-5865-4669-853f-4aaf462aabbb/image.gif)
<br>
<br>
<br>

#### 3) 🥗 식품영양정보
(개발 : 김미정)
![](https://velog.velcdn.com/images/kimmy25312/post/e29736df-8f92-4887-a7e6-623a3225de47/image.png)
![](https://velog.velcdn.com/images/kimmy25312/post/2e8d8cd0-adf6-4b08-b882-dfab54931e3d/image.gif)
<br><br>
#### 4) 🧘 명상
(개발 : 김미정 / 아이디어 제공 : 김진우)
![](https://velog.velcdn.com/images/kimmy25312/post/5730c59c-6362-4bdf-8299-6fc0bd8e9ca6/image.png)
![](https://velog.velcdn.com/images/kimmy25312/post/99e39f68-d888-4c43-8b89-83526830c12e/image.gif)
<br>
#### 5) ♠️블랙잭 게임(성연준)
![](https://velog.velcdn.com/images/kimmy25312/post/32c5ed55-f592-42cc-a809-0a165cd47c41/image.gif)
<br>

## 6. ✅ 트러블 슈팅
[블랙잭(성연준)]<br>
🔴 문제점 : 게임 종료 후에도 버튼 클릭 시 카드가 계속 받아지고, 베팅 금액도 증가<br>
🟢 해결방안 : 게임 종료 후, 다음 다운드로 리셋할 때까지 각 버튼의 클릭 이벤트 비활성화

[운동가이드(김진우)]<br>
🔴 문제점 : 운동 선택 시 중복하여 추가되는 현상 발생<br>
🟢 해결방안 : dataset 속성을 활용하여 이미 추가된 운동인지 확인하여 중복 추가 방지

[식품영양정보(김미정)]<br>
🔴 문제점 : 사용자가 검색어를 입력할 때, 정확히 일치하는 단어만 검색결과에 표시됨<br>
 - 예시) '고구마줄기'라고 검색하면 '고구마줄기나물'이 검색되나, '고구마나물'이라고 검색하면 중간에 다른 단어가 포함된 단어인 '고구마줄기나물'은 검색되지 않음
 
🟢 해결방안 : 사용자가 입력한 검색어를 split() 함수로 공백 기준으로 나누어 배열에 각각 별도의 키워드로 저장한 후,
   1) 각각의 키워드에 대한 검색 결과 저장
   2) 그 중 모든 키워드를 포함하는 검색 결과만 사용자에게 보여지는 식으로 로직 변경
- 예시) 사용자가 '삼각 김밥'이라고 검색 시, '삼각'과 '김밥'을 배열의 데이터 요소로 저장 -> 삼각과 김밥에 대한 검색결과를 별도로 검색 -> '삼각'의 검색 결과 중 '김밥'도 포함하는 것만 사용자에게 보여줌
<br>

## 🔄 업데이트 예정
🔹블랙잭 split 기능 구현<br>
🔹식품영양정보 페이지와 연계된 식품 구매 페이지 개발하여 수익창출<br>
🔹본인 목표 체형 및 몸상태를 더욱 구체적으로 분석하여 맞춤형 운동계획 솔루션 제공
