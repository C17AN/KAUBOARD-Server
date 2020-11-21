const path = require("path");
const express = require("express");
const router = express.Router();
const axios = require("axios");

const today = new Date();
const day = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000);
const quotes = [
  { quote: "삶이 있는 한 희망은 있다.", speaker: "키케로" },
  { quote: "산다는 것, 그것은 치열한 전투이다.", speaker: "로맹 로랑" },
  {
    quote: "하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다. ",
    speaker: "사무엘 존슨",
  },
  {
    quote: "언제나 현재에 집중할 수 있다면 행복할 것이다.",
    speaker: "파울로 코엘료",
  },
  {
    quote:
      "진정으로 웃으려면 고통을 참아야 하며, 나아가 고통을 즐길 줄 알아야 한다.",
    speaker: "찰리 채플린",
  },
  {
    quote:
      "진정으로 웃으려면 고통을 참아야 하며, 나아가 고통을 즐길 줄 알아야 한다.",
    speaker: "찰리 채플린",
  },
  {
    quote: "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다.",
    speaker: "엘버트 허버드",
  },
  { quote: "신은 용기있는 자를 결코 버리지 않는다.", speaker: "켄러" },
  { quote: "피할 수 없다면 즐겨라.", speaker: "로버트 엘리엇" },
  {
    quote:
      "단순하게 살아라. 현대인은 쓸데없는 절차와 일 때문에 얼마나 복잡한 삶을 살아가는가?",
    speaker: "이드리스 샤흐",
  },
  {
    quote: "먼저 자신을 비웃어라. 다른 사람이 당신을 비웃기 전에.",
    speaker: "엘사 맥스웰",
  },
  {
    quote:
      "먼저 핀 꽃은 먼저 진다. 남보다 먼저 공을 세우려고 조급히 서두를 것이 아니다.",
    speaker: "채근담",
  },
  {
    quote: "행복한 삶을 살기 위해 필요한 것은 거의 없다.",
    speaker: "마르쿠스 아우렐리우스",
  },
  {
    quote:
      "절대 어제를 후회하지 마라. 인생은 오늘의 나 안에 있고 내일은 스스로 만드는 것이다.",
    speaker: "L. 론 허버드",
  },
  {
    quote:
      "어리석은 자는 멀리서 행복을 찾고, 현명한 자는 자신의 발치에서 행복을 키워간다.",
    speaker: "제임스 오펜하임",
  },
  {
    quote: "한번의 실패와 영원한 실패를 혼동하지 마라.",
    speaker: "F. 스콧 피츠제럴드",
  },
  { quote: "계단을 밟아야 계단 위에 올라설 수 있다.", speaker: "터키 속담" },
  {
    quote: "오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.",
    speaker: "앙드레 말로",
  },
  {
    quote:
      "좋은 성과를 얻으려면 한 걸음 한 걸음이 힘차고 충실하지 않으면 안된다",
    speaker: "단테",
  },
  { quote: "행복은 습관이다. 그것을 몸에 지녀라.", speaker: "허버드" },
  {
    quote:
      "성공의 비결은 단 한 가지, 잘할 수 있는 일에 광적으로 집중하는 것이다.",
    speaker: "톰 모나건",
  },
  {
    quote: "자신감 있는 표정을 지으면 자신감이 생긴다.",
    speaker: "찰스 다윈",
  },
  {
    quote: "평생 살 것처럼 꿈을 꾸어라. 그리고 내일 죽을 것처럼 오늘을 살아라.",
    speaker: "제임스 딘",
  },
  { quote: " 1퍼센트의 가능성, 그것이 나의 길이다.", speaker: "나폴레옹" },
  {
    quote: "고통이 남기고 간 뒤를 보라! 고난이 지나면 반드시 기쁨이 스며든다.",
    speaker: "괴테",
  },
  {
    quote: "꿈을 간직하고 있다 보면 반드시 실현할 때가 온다.",
    speaker: "괴테",
  },
  {
    quote:
      "화려한 일을 추구하지 말라. 중요한 것은 스스로의 재능이며, 자신의 행동에 쏟아 붓는 사랑의 정도이다.",
    speaker: "마더 테레사",
  },
  {
    quote: "마음만을 가지고 있어서는 안된다. 반드시 실천하여야 한다.",
    speaker: "이소룡",
  },
  {
    quote:
      "만약 우리가 할 수 있는 일을 모두 한다면 우리들은 자신에게 깜짝 놀랄 것이다.",
    speaker: "토마스 에디슨",
  },
  {
    quote:
      "진짜 문제는 사람들의 마음이다. 그것은 절대로 물리학이나 윤리학의 문제가 아니다.",
    speaker: "아인슈타인",
  },
  {
    quote:
      "해야 할 것을 하라. 모든 것은 타인의 행복을 위해서, 동시에 특히 나의 행복을 위해서이다.",
    speaker: "톨스토이",
  },
  {
    quote:
      "사람이 여행을 하는 것은 도착하기 위해서가 아니라 여행하기 위해서이다.",
    speaker: "괴테",
  },
  {
    quote: "화가 날 때는 100까지 세라. 최악일 때는 욕설을 퍼부어라.",
    speaker: "마크 트웨인",
  },
  {
    quote: "고개를 들고, 세상을 똑바로 정면으로 바라보십시오.",
    speaker: "헬렌 켈러",
  },
  {
    quote:
      "고난의 시기에 동요하지 않는 것, 이것은 진정 칭찬받을 만한 뛰어난 인물의 증거다.",
    speaker: "베토벤",
  },
  {
    quote:
      "성공해서 만족하는 것은 아니다. 만족하고 있었기 때문에 성공한 것이다.",
    speaker: "알랭",
  },
  {
    quote: "곧 위에 비교하면 족하지 못하나, 아래에 비교하면 남음이 있다.",
    speaker: "명심보감",
  },
  {
    quote: "그대의 하루 하루를 그대의 마지막 날이라고 생각하라.",
    speaker: "호라티우스",
  },
  {
    quote: "자신을 내보여라. 그러면 재능이 드러날 것이다.",
    speaker: "발타사르 그라시안",
  },
  {
    quote: "당신이 할수 있다고 믿든 할수 없다고 믿든 믿는 대로 될 것이다.",
    speaker: "헨리 포드",
  },
  {
    quote: "작은 기회로부터 종종 위대한 업적이 시작된다.",
    speaker: "데모스테네스",
  },
  {
    quote:
      "인생이란 학교에는 불행이란 훌륭한 스승이 있다. 그 스승 덕분에 우리는 더욱 단련되는 것이다.",
    speaker: "프리체",
  },
  {
    quote: "세상은 고통으로 가득하지만 그것을 극복하는 사람들로도 가득하다.",
    speaker: "헬렌 켈러",
  },
  {
    quote:
      "용기있는 자로 살아라. 운이 따라주지 않는다면 용기 있는 가슴으로 불행에 맞서라.",
    speaker: "키케로",
  },
  { quote: "최고에 도달하려면 최저에서 시작하라.", speaker: "P. 시루스" },
  {
    quote:
      "문제는 목적지에 얼마나 빨리 가느냐가 아니라, 그 목적지가 어디냐는 것이다.",
    speaker: "메이벨 뉴컴버",
  },
  {
    quote:
      "당신의 행복은 무엇이 당신의 영혼을 노래하게 하는가에 따라 결정된다.",
    speaker: "낸시 설리번",
  },
  {
    quote:
      "자신이 해야 할 일을 결정하는 사람은 세상에서 단 한 사람, 오직 나 자신뿐이다.",
    speaker: "오손 웰스",
  },
  {
    quote: "인생을 다시 산다면 다음번에는 더 많은 실수를 저지르리라.",
    speaker: "나딘 스테어",
  },
  {
    quote:
      "인생에서 원하는 것을 얻기 위한 첫 번째 단계는 내가 무엇을 원하는지 결정하는 것이다.",
    speaker: "벤스타인",
  },
  { quote: "문제점을 찾지 말고 해결책을 찾아라.", speaker: "헨리 포드" },
  { quote: "인생에 뜻을 세우는데 있어 늦은 때라곤 없다.", speaker: "볼드윈" },
  {
    quote: "불행을 잊는 가장 좋은 방법은 일에 몰두하는 것이다.",
    speaker: "베토벤",
  },
  {
    quote:
      "우리는 두려움의 홍수에 버티기 위해서 끊임없이 용기의 둑을 쌓아야 한다.",
    speaker: "마틴 루터 킹",
  },
  {
    quote:
      "이미 끝난 일을 후회하기보다는 하고 싶었던 일들을 하지 못한 것을 후회하라.",
    speaker: "탈무드",
  },
  {
    quote: "실패는 잊어라. 그러나 그것이 준 교훈은 절대 잊어선 안된다.",
    speaker: "하버트 개서",
  },
  {
    quote: "굳은 인내와 노력을 하지 않은 천재는 세상에 존재한 적이 없다.",
    speaker: "아이작 뉴턴",
  },
  { quote: "발명의 길은 무던한 노력이다.", speaker: "아이작 뉴턴" },
  {
    quote: "천재는 1%의 영감과 99%의 노력으로 만들어진다.",
    speaker: "토마스 에디슨",
  },
  {
    quote:
      "인생의 어떤 것도 두려움의 대상이 아니다. 그저 이해해야 할 대상일 뿐이다.",
    speaker: "마리 퀴리",
  },
  { quote: "계속 갈망하라, 여전히 우직하게.", speaker: "스티브 잡스" },
  {
    quote: "성공한 사람보다는 가치 있는 사람이 돼라.",
    speaker: "알버트 아인슈타인",
  },
  {
    quote: "나는 미래에 대해 생각하는 법이 없다. 어차피 곧 닥치기 때문이다.",
    speaker: "알버트 아인슈타인",
  },
  {
    quote:
      "무엇과도 바꿀 수 없는 존재가 되기 위해서는 언제나 남과 달라야 한다.",
    speaker: "코코 샤넬",
  },
  {
    quote: "인생은 과감한 모험이던가, 아니면 아무것도 아니다.",
    speaker: "헬렌 켈러",
  },
  {
    quote: "모험은 그 자체만으로도 해볼만한 가치가 있다.",
    speaker: "아멜리아 에어하트",
  },
  {
    quote:
      "자신의 능력을 믿어야 합니다. 그리고 끝까지 밀고 나갈 만큼 충분히 강해야 합니다.",
    speaker: "로잘린 카터",
  },
  {
    quote: "젊은 날의 매력은 결국 꿈을 위해 무언가를 저지르는 것이다.",
    speaker: "앨빈 토플러",
  },
  {
    quote: "가장 큰 위험은 위험을 감수하지 않는 것이다.",
    speaker: "마크 주커버그",
  },
  {
    quote: "도전을 받아들여라. 그러면 승리의 쾌감을 맛볼 지도 모른다.",
    speaker: "조지 S. 패튼",
  },
  {
    quote: "주여, 제가 이룬 것보다 항상 더 많이 갈망하게 하소서.",
    speaker: "미켈란젤로",
  },
  {
    quote:
      "인생이 끝날까 두려워하지 마라. 당신의 인생이 시작조차 하지 못할 수 있음을 두려워하라.",
    speaker: "그레이스 한센",
  },
  {
    quote:
      "배우기만 하고 생각하지 않으면 얻는 것이 없고, 생각만 하고 배우지 않으면 위태롭다.",
    speaker: "공자",
  },
  {
    quote:
      "계속 같은 행동을 되풀이하면서 다른 결과를 기대하는 것은 정신병이다.",
    speaker: "알버트 아인슈타인",
  },
  {
    quote: "인내하라. 내 삶에서 가장 소중한 발견은 바로 인내였다.",
    speaker: "아이작 뉴턴",
  },
];

router.get("/quotes", (req, res) => {
  res.send({
    todayQuote: quotes[day / quotes.length].quote,
    todaySpeaker: quotes[day / quotes.length].speaker,
  });
});

module.exports = { router };
