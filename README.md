# 요구사항

## 프로젝트 목표

Chat GPT와 유사한 채팅 AI Application 구현하는 것입니다.

## 사용하는 기술 스택

- UI라이브러리
    - TailwindCSS : https://tailwindcss.com/
    - shadcn/ui : https://ui.shadcn.com/
- AI SDK
    - AI SDK : https://ai-sdk.dev/docs/introduction

## 구현 단계

### Step1. 프로젝트 초기 설치, 필요한 라이브러리 세팅

### Step2. App Router의 API Router 핸들러 구현
- **목표**: 클라이언트 요청을 처리하고 AI와의 상호작용을 관리하는 백엔드 로직을 작성합니다.
- **작업**:
    - AI SDK를 사용하여 AI와의 통신을 위한 엔드포인트를 구현합니다.
    - 클라이언트로부터의 요청을 처리하고, AI의 응답을 클라이언트에 반환하는 로직을 작성합니다.

### Step3. 프론트엔드와 API 연동
- AI SDK 5버전 : https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#chatbot
- **목표**: 프론트엔드에서 백엔드 API를 호출하여 데이터를 주고받습니다.
- **작업**:
    - Axios 또는 Fetch API를 사용하여 백엔드 API와 통신하는 함수를 작성합니다.
    - 사용자 입력을 받아 API에 요청을 보내고, AI의 응답을 화면에 표시하는 로직을 구현합니다.

### Step4. UI 컴포넌트를 구현
- **목표**: 사용자 인터페이스를 구성하는 다양한 컴포넌트를 구현합니다.
- **작업**:
    - TailwindCSS를 사용하여 스타일링된 UI 컴포넌트를 작성합니다.
    - shadcn/ui 라이브러리의 컴포넌트를 활용하여 일관된 디자인을 유지합니다.
    - 사용자 경험을 고려하여 인터렉티브한 요소를 추가합니다.
    - 모바일 환경을 고려합니다.
    - UI Reference : https://www.istockphoto.com/kr/%EB%B2%A1%ED%84%B0/%EC%98%A8%EB%9D%BC%EC%9D%B8-%EC%B1%84%ED%8C%85-%EC%9C%88%EB%8F%84%EC%9A%B0-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%9D%91%EC%9A%A9-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-gm1412219027-461737640

### Step5. Vercel 배포
- **목표**: 완성된 애플리케이션을 Vercel 플랫폼에 배포하여 사용자에게 제공할 수 있도록 합니다.
- **작업**:
    - Vercel 계정을 생성하고 프로젝트를 연결합니다.
    - 배포 설정을 구성하고, 필요한 환경 변수를 설정합니다.
    - 최종적으로 애플리케이션을 배포하고, 배포된 URL을 확인합니다.
