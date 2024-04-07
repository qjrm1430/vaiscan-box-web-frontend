# vAIscan Box

S3 클라우드 스토리지와 통합된, AI기반 멀웨어 탐지 웹 애플리케이션

**작업 기간 :** 2022.12 ~ 2023.02

**소개 영상** : https://youtu.be/Gr3N1OAxoQ8?si=MZ8mNyFkS5qRQ7Xz

**인력 구성 :** Designer/Front-End (1), Back-End(1), AI(1) - Total (3)

**프로젝트 목적 :** AI기반 멀웨어 탐지 기능 통합 S3 클라우드 스토리지 서비스 제공

**수상** : 2023 상반기 심화 프로젝트 경진대회 최우수상

<aside>
💡 vAIScan Box는 AI 기술을 활용하여 바이러스를 탐지하는 서비스로, 'virus'와 'AI scan'의 합성어입니다. 회원의 경우 검사를 마친 안전한 파일을 AWS S3 클라우드에 저장할 수 있는 추가적인 스토리지 옵션을 제공받습니다. 이 서비스는 기존의 시그니처 기반 탐지 방식을 넘어서 새로운 유형의 멀웨어도 탐지해 낼 수 있는 서비스입니다. 파일의 해시 값을 이용해 기존에 검사된 파일은 데이터베이스에서 즉시 결과를 제공하고, 새로운 파일은 AI 서버에서 위험도를 분석하여 결과를 전달합니다.
</aside>

<br/>

### 소개 영상

https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/3c81daa9-2d81-4969-83b9-fe34ba8ba2fc

<br/>

## 🛠️ 사용 기술 및 라이브러리

- Typescript, Python
- Node.js, NestJS, VueJS
- Tensorflow, Scikit-learn, JWT, websocket
- MariaDB, MongoDB
- AWS EC2, AWS S3

<br/>

## 🔗 아키텍처

![BlackWhopper_구성도](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/8b7f65e6-2f0d-4b0f-89de-37a345632bbd)

> Back-end : [https://github.com/dev1ck/vaiscan-box-web-backend](https://github.com/dev1ck/vaiscan-box-web-backend)
>
>
> Front-end : [https://github.com/dev1ck/vaiscan-box-web-frontend](https://github.com/dev1ck/vaiscan-box-web-frontend)
>
> AI Server : [https://github.com/dev1ck/vaiscan-box-ai](https://github.com/dev1ck/vaiscan-box-ai)
>

<br/>

## ⚡ 기능 소개

![vAIscan_Box_2023](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/36b5e89f-27e5-4159-b198-4937c8af3297)
![슬라이드13](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/d16be9ca-d0df-4073-971b-5accb9a008ad)
![슬라이드14](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/ee546839-1c27-4f3d-8d0e-ad62e45ec3a9)
![슬라이드15](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/f15942ba-0e39-48ba-99d0-c0871e44daa5)
![슬라이드16](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/7d00d622-eabb-4047-a273-0c153cd19eab)

<br/>

## ⚙️ 동작 원리

![슬라이드18](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/ba99ea1c-4235-41d1-a4fe-6b87821e70c0)
![슬라이드19](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/97832761-3e41-4a0e-8a86-7d869877fee2)
![슬라이드20](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/fb09629c-b096-478a-8fda-9a7124e6fb10)
![슬라이드21](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/86463110-15ea-47b0-b481-e7dfab51a0c1)
![슬라이드22](https://github.com/dev1ck/vaiscan-box-web-backend/assets/96347313/88f0b0f8-c66d-41ab-9b4d-8c59e63f4e23)

<br/>

---

<br/>

# How To Use
# Quasar App (vaiscan-box-web-frontend)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
