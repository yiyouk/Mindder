<div align="center">
    <h3>😄 웃조 😄</h3>
    <p>⭐️ Platforms & Languages ⭐️</p>
<div>
<div align="center">
    <img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Conda-Forge&logoColor=white" />
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
	<br>
	<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=Spring Boot&logoColor=white" />
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
	<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white" />
	<img src="https://img.shields.io/badge/Mybatis-000000?style=flat&logo=Fluentd&logoColor=white" />
</div>
<br>
<div align=center>
	<p>🛠 Tools 🛠</p>
</div>
<div align=center>
	<img src="https://img.shields.io/badge/Eclipse%20IDE-2C2255?style=flat&logo=EclipseIDE&logoColor=white" />
	<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat&logo=VisualStudioCode&logoColor=white" />
	<br>
	<img src="https://img.shields.io/badge/Tomcat-F8DC75?style=flat&logo=ApacheTomcat&logoColor=white" />
	<img src="https://img.shields.io/badge/AWS-232F3E?style=flat&logo=AmazonAWS&logoColor=white" />
	<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white" />
</div>
<div align="left">

# 깃 컨벤션 (커밋, 깃 플로우 전략)

## 🖤 커밋 메시지 컨벤션

<aside>
✅

### 1. 커밋 유형 지정

- 커밋 유형은 영어 대문자로 작성하기
    
    
    | 커밋 유형 | 의미 |
    | --- | --- |
    | Feat | 새로운 기능 추가 |
    | Fix | 버그 수정 |
    | Add | Feat 이외의 부수적인 코드 추가/라이브러리 추가/ 새로운 View나 Activity 생성 |
    | Docs | 문서 수정 |
    | Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
    | Refactor | 코드 리팩토링 |
    | Test | 테스트 코드, 리팩토링 테스트 코드 추가 |
    | Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
    | Design | CSS 등 사용자 UI 디자인 변경 |
    | Comment | 필요한 주석 추가 및 변경 |
    | Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
    | Remove | 파일을 삭제하는 작업만 수행한 경우 |
    | !BREAKING CHANGE | 커다란 API 변경의 경우 |
    | !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |

### 2. 제목과 본문을 빈행으로 분리

- 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것
- 본문에는 변경한 내용과 이유 설명 (어떻게 보다는 무엇 & 왜를 설명)

### 3. 제목 첫 글자는 대문자로, 끝에는 `.` 금지

### 4. 제목은 영문 기준 50자 이내로 할 것

### 5. 자신의 코드가 직관적으로 바로 파악할 수 있다고 생각하지 말자

### 6. 여러가지 항목이 있다면 글머리 기호를 통해 가독성 높이기

```
- 변경 내용 1
- 변경 내용 2
- 변경 내용 3
```

</aside>

### 🖤 규칙에 맞는 좋은 커밋메시지를 작성해야 하는 이유

- 팀원과의 소통
- 편리하게 과거 추적 가능
- 나중에 실무에서 익숙해지기 위해

<aside>
☝ 안 지킨 사례

<img src ="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4b8b9937-a26c-4f16-8de2-d4fbfbd97094%2FUntitled.png?id=224056b5-95ac-4d54-bd45-da14f98476de&table=block&spaceId=fa16d34c-752f-4e68-befa-9e3aa9d11260&width=1920&userId=c238b7de-2cf9-40b3-b7eb-0d50dfa016c7&cache=v2"/>

</aside>

### 🖤 한 커밋에는 한 가지 문제만!

- 추적 가능하게 유지해주기
- 너무 많은 문제를 한 커밋에 담으면 추적하기 어렵다.

### 🖤 CLI에서 커밋 메시지 여러 줄로 작성하는 방법

<aside>
✅ 쌍따옴표를 닫지 말고 개행하며 작성 → 다 작성한 후에 쌍따옴표를 닫으면 작성 완료

```bash
git commit -m "FEAT: 회원가입 기능 추가

- 회원가입 기능 추가"
```

<img src ="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F335eb35f-5297-403d-8fde-2343a41a5c66%2FUntitled.png?id=21f7b1e3-8fd1-46fd-b20f-decea1f401b1&table=block&spaceId=fa16d34c-752f-4e68-befa-9e3aa9d11260&width=1920&userId=c238b7de-2cf9-40b3-b7eb-0d50dfa016c7&cache=v2">

</aside>

## 📌 issue convention

---

- 제목은 영어로 작성한다.
- 내용은 다른 사람이 알아볼 수 있게 본인이 작업할 내용을 적는다.
- 라벨을 설정한다.
- EX
    
<img src ="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa4f7708b-28cf-444b-beca-ad4525115f3b%2FUntitled.png?id=6518dc8a-a6bc-48bd-be0b-d5996423284b&table=block&spaceId=fa16d34c-752f-4e68-befa-9e3aa9d11260&width=1920&userId=c238b7de-2cf9-40b3-b7eb-0d50dfa016c7&cache=v2">
    
<img src ="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9bc518c2-2da3-4d1d-bce8-c2ab5bf59941%2FUntitled.png?id=a6f70dfa-a44d-48fe-a7eb-8fec526a69d3&table=block&spaceId=fa16d34c-752f-4e68-befa-9e3aa9d11260&width=1920&userId=c238b7de-2cf9-40b3-b7eb-0d50dfa016c7&cache=v2">

## 📌 pr convention

---

- 제목은 영어로 작성한다. (이슈 컨벤션과 같음)
- [영어 대문자] #이슈번호 - 해당 이슈 내용 (꼭 이슈랑 동일하지는 않아도 된다. 이슈 번호만 신경써서 적기)
- 내용에는 변경 사항을 적는다.
- 해당 이슈의 `closed #이슈`를 단다.
- assignees를 본인으로 설정한다.
- reviewers를 설정한다.
- 라벨을 설정한다.
- 코드 리뷰를 받는다.
- 변경 request 단 경우 확인 후 resolve를 한다.
- 스쿼시 머지를 한다.
- EX
    
<img src = "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F364d175a-fea4-4a86-8e71-83f830552dba%2FUntitled.png?id=60a1eedc-7d04-4608-b98a-30c91e8ecfe4&table=block&spaceId=fa16d34c-752f-4e68-befa-9e3aa9d11260&width=1920&userId=c238b7de-2cf9-40b3-b7eb-0d50dfa016c7&cache=v2">
    

## 📌 git flow

---

작업하는 동안 default branch를 develop으로 바꿔 놓을게요.

- **pr 날릴 때 어디로 날리는 건지 체크 한 번 씩 더 해주세요!**

### **main → develop → eunji_feature/#3**

main은 모든 작업이 끝난 후 develop에서 merge 시킨다.

—————————————————————————

- main - 초기 세팅 존재
- develop - local 작업 완료 후 merge 브랜치
- minji - 민지 local 브랜치
- eunji - 은지 local 브랜치
- minsik - 민식 local 브랜치
- localdevelop_feature/#issue - 각자의 기능 추가 브랜치 → ex) eunji_feature/#3

—————————————————————————

1. `local - feature` 에서 각자 기능 작업
2. 작업 완료 후 `remote - develop` 에 PR
3. **코드 리뷰 후 Confirm 받고 Merge**
4. remote - develop 에 Merge 될 때 마다 **모든 팀원 remote - develop pull** 받아 최신 상태 유지

main → develop → feature/내용, fix/내용, refactor/내용

1. local에서 각자 작업
2. 작업 완료 후 remote - develop으로 pr
3. 코드 리뷰 후 merge

# 코딩 컨벤션

### ☑️ 코드 컨벤션이 필요한 이유

- 팀원끼리 코드를 공유하기 때문에 일관성 있는 코드를 작성하면 서로 이해하기 쉽다.
- 나중에 입사 지원 시 프로젝트를 하며 코드 컨벤션을 만들어 진행했다고 하면 협업 면에서 유리하게 작용할 수 있다.

### 참고

[코딩컨벤션](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION)

# FrontEnd

## 1. **NAMING CONVENTIONS**

- **components 이름은 Pascal Case로 작성한다.**
- **Non-components 이름은 Camel Case로 작성한다.**

## 2. **BUG AVOIDANCE**

- null **또는 undefined일 수 있는 값은 optional chaining 연산자 (?.)를 사용한다.**

## 3. **ARCHITECTURE & CLEAN CODE**

- **유틸리티 파일을 만들어 중복된 코드를 피한다.**
- **Presentational 컴포넌트와 Container 컴포넌트를 분리하여 사용한다.**
- **고차 컴포넌트(Higher Order Components, HOC)는 적절하게 사용한다.**
- **JS, test, css로 파일을 분리한다.**
- **불필요한 주석을 사용하지 않는다.**
- **현재 화면보다 긴 코드는 더 작은 단위의 코드로 리팩토링 한다.**
- **주석 처리된 코드는 커밋하지 말고 삭제한다.**

## 4. **ES6**

- **class component가 아닌 function component를 사용한다.**
- **JSX 문법을 사용한다.**
- **spread 연산자를 사용한다.**
- **구조 분해 할당을 사용한다. let과 const만 사용한다. (var 사용금지)**
- **되도록 화살표 함수를 사용한다.**
- **직접 null을 체크하기 보다 optional chaining 연산자 (?.)를 사용한다.**

## 5. **TESTING**

- **테스트를 작성한다.**
- **적정 수준의 테스트 커버리지를 유지한다.**
- **하나의 테스트 파일에서 하나만 테스트 한다.**
- **테스트 코드안에서 로직을 사용하지 않는다.**
- **테스트 클래스는 하나의 클래스만 테스트 한다.**
- **네트워크, 데이터 베이스와 직접 통신하지말고 가짜 함수를 사용한다.**

## 6. **CSS**

- **inline css를 사용하지 않는다.**
- **명명 규칙을 지킨다.**

참고 : [https://www.jondjones.com/frontend/react/react-tutorials/react-coding-standards-and-practices-to-level-up-your-code/](https://www.jondjones.com/frontend/react/react-tutorials/react-coding-standards-and-practices-to-level-up-your-code/)

# BackEnd
## ☑️ 코드 컨벤션

```bash
문자열을 처리할 때는 쌍따옴표를 사용하도록 합니다.
```

```bash
문장이 종료될 때는 세미콜론을 붙여줍니다.
```

```bash
🐫 함수명, 변수명은 카멜케이스로 작성합니다.
```


```bash
🥙 URL, 파일명은 케밥케이스로 작성합니다.
```


```bash
☝ 가독성을 위해 한 줄에 하나의 문장만 작성합니다.
```

```bash
주석은 설명하려는 구문에 맞춰 들여쓰기 합니다.
```

```jsx
// Good
function someFunction() {
  ...

  // statement에 관한 주석
  statements
}
```



```bash
연산자 사이에는 공백을 추가하여 가독성을 높입니다
```

```jsx
a+b+c+d // bad
a + b + c + d // good
```

</aside>

```bash
☝ 콤마 다음에 값이 올 경우 공백을 추가하여 가독성을 높입니다.
```

```jsx
var arr = [1,2,3,4]; //bad
var arr = [1, 2, 3, 4]; //good
```

```bash
🔠 생성자 함수명의 맨 앞글자는 대문자로 합니다.
```

```jsx
function Person(){}
```

```bash
🔠 ENUM이나 상수는 대문자로 합니다.
```
```jsx
NORMAL_STATUS = 10;
```

```bash
🔠 함수명은 소문자로 시작하고 동사로 합니다.
```

```jsx
function getUserId(){}
```

---

### ☑️ **Structure**

1. **패키지는 목적별로 묶는다.**
    - common(공통기능 관련 패키지), user(User 관련 패키지), coupon(쿠폰 관련 패키지)
2. **Controller에서는 최대한 어떤 Service를 호출할지 결정하는 역할과 Exception처리만을 담당하자.**
    - Controller 단에서 로직을 구현하는 것을 지양한다.
3. **하나의 메소드와 클래스는 하나의 목적을 두게 만든다.**
    - 하나의 메소드 안에서 한가지 일만 해야한다.
    - 하나의 클래스 안에서는 같은 목적을 둔 코드들의 집합이여야한다.
4. **메소드와 클래스는 최대한 작게 만든다.**
    - 메소드와 클래스가 커진다면 하나의 클래스나 메소드 안에서 여러 동작을 하고 있을 확률이 크다.
    - 수많은 책임을 떠안은 클래스를 피한다. 큰 클래스 몇 개가 아니라 작은 클래스 여럿으로 이뤄진 시스템이 더욱 바람직하다.
    - 클래스 나누는 것을 두려워하지 말자.
5. **도메인 서비스를 만들어지는 것을 피하자.**
    - User라는 도메인이 있을 때, UserService로 만드는 것을 피한다.
    - 이렇게 도메인 네이밍을 딴 서비스가 만들어지면 자연스레 수많은 책임을 떠안은 큰 클래스로 발전될 가능성이 높다.
    - 기능 별로 세분화해서 만들어보자. (UserRegisterService, UserEmailService 등...)
6. **에러 검출(try - catch)**
    - 최상단에서 에러 검출 하기
    - ex) 컨트롤러 서비스 DAO가 있으면  컨트롤러에서 try -catch문 작성

## 🍃 스프링부트 네이밍 컨벤션

<aside>
✅

### ▶ Controller

- 컨트롤러 클래스 안에서 메서드 명을 작성 할 때는 아래와 같은 접미사를 붙인다.
    
    
    | 메서드명 | 의미 |
    | --- | --- |
    | orderList() | 목록 조회 유형의 서비스 |
    | orderDetails() | 단 건 상세 조회 유형의 controller 메서드 |
    | orderSave() | 등록/수정/삭제 가 동시에 일어나는 유형의 controller 메서드 |
    | orderAdd() | 등록만 하는 유형의 controller 메서드 |
    | orderModify() | 수정만 하는 유형의 controller 메서드 |
    | orderRemove() | 삭제만 하는 유형의 controller 메서드 |

### ▶ ****Service****

- 서비스 클래스 안에서 메서드 명을 작성 할 때는 아래와 같은 접두사를 붙인다.
    
    
    | 메서드명 | 의미 |
    | --- | --- |
    | findOrder() | 조회 유형의 service 메서드 |
    | addOrder() | 등록 유형의 service 메서드 |
    | modifyOrder() | 변경 유형의 service 메서드 |
    | removeOrder() | 삭제 유형의 service 메서드 |
    | saveOrder() | 등록/수정/삭제 가 동시에 일어나는 유형의 service 메서드 |

### ▶ Mapper

- Mapper 클래스 안에서 메서드 명을 작성 할 때는 아래와 같은 접두사를 붙인다.
    
    
    | 메서드명 | 의미 |
    | --- | --- |
    | selectOrder() | 조회 유형의 mapper 메서드 |
    | insertOrder() | 등록 유형의 mapper 메서드 |
    | updateOrder() | 변경 유형의 mapper 메서드 |
    | deleteOrder() | 삭제 유형의 mapper 메서드 |

</aside>
</div>
