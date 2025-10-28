# 💬 ChatM3

A **WhatsApp-inspired chat UI** built with **Expo Router**, **React Native**, and **TypeScript**.  
It includes phone number authentication, OTP verification, splash screen animation (with GIF support), and a clean modular structure.

---

## 🧠 Tech Stack

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

---

## 🚀 Features

- 📱 Phone number input with country picker
- 🔐 OTP verification countdown with resend option
- 💬 Chat navigation structure (ready for tab expansion)
- 🎨 Reusable, scalable UI components
- 🟢 WhatsApp-style splash screen (supports GIFs)
- ⚙️ File-based navigation powered by Expo Router

---

## 📁 Project Structure

```bash
chatm3/
├── app/
│   ├── (auth)/               # Authentication routes
│   │   ├── input_number.tsx
│   │   ├── verify_otp/[phone].tsx
│   │   └── _layout.tsx
│   ├── (tabs)/               # Main chat routes
│   ├── _layout.tsx           # Root layout (with splash & auth check)
│   └── index.tsx             # Welcome screen with GIF
├── src/
│   ├── components/           # Reusable UI components
│   ├── constants/            # Colors, image paths, etc.
│   ├── assets/               # Images, fonts, GIFs
│   └── utils/                # Helpers
└── package.json
```

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chatm3.git
cd chatm3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npx expo start
```

---

## 📦 Key Dependencies

| Library                                                                                                | Purpose                           |
| ------------------------------------------------------------------------------------------------------ | --------------------------------- |
| [react-native-country-picker-modal](https://github.com/xcarpentier/react-native-country-picker-modal)  | Country picker with flags & codes |
| [react-native-confirmation-code-field](https://github.com/retyui/react-native-confirmation-code-field) | OTP input field                   |
| [react-native-mask-input](https://github.com/CaioQuirinoMedeiros/react-native-mask-input)              | Masked phone input                |
| [react-native-size-matters](https://github.com/nirsky/react-native-size-matters)                       | Scalable sizing for all screens   |
| [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)                            | Secure token storage              |

---

## 📸 Screens

| Screen                  | Description                            |
| ----------------------- | -------------------------------------- |
| 🟢 **Welcome Screen**   | Animated intro with WhatsApp-style GIF |
| 🔢 **Phone Input**      | Enter phone number with country picker |
| 🔐 **OTP Verification** | Code field input and countdown timer   |
| 💬 **Chats Tab**        | Placeholder for chat UI (expandable)   |

---

> 💡 _Built with ❤️ using React Native + Expo_
