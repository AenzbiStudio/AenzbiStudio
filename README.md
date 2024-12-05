# AenzbiStudio IDE

AenzbiStudio is a powerful cross-platform integrated development environment (IDE) designed for building and deploying applications seamlessly across **Android**, **iOS**, **Windows**, and the **Cloud**. It includes robust CLI tools, real-time collaboration features, fiscal printer integration, and deployment capabilities optimized for African regions using **Firebase** and **Google Cloud**.

---

## **Features**
- **Cross-Platform Support**: Build and deploy for Android, iOS, Windows, and Cloud.
- **Integrated CLI**: Subcommands for `build`, `deploy`, and `lint`.
- **Real-Time Collaboration**: WebSocket-powered live coding collaboration.
- **Fiscal Printer Integration**: ESC/POS receipt printing support.
- **Codespaces Support**: GitHub Codespaces configuration for prebuilt environments.
- **African Region Deployment**: Optimized deployments on Firebase and Google Cloud.

---

## **Requirements**
### **General Prerequisites**
Ensure the following tools are installed:
1. [Git](https://git-scm.com/downloads)
2. [Docker](https://www.docker.com/products/docker-desktop)
3. [Node.js](https://nodejs.org/)
4. [Flutter](https://flutter.dev/docs/get-started/install)
5. [Android Studio](https://developer.android.com/studio)
6. **Xcode** (macOS only) - Available on the Mac App Store.
7. [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)
8. **Firebase CLI** - Install via npm:
   ```bash
   npm install -g firebase-tools
   ```

---

## **Directory Structure**

```plaintext
AenzbiStudio/
├── .devcontainer/
│   └── devcontainer.json     # Codespaces configuration
├── android/                  # Android-specific Flutter files
├── ios/                      # iOS-specific Flutter files
├── web/                      # Web project files
├── backend/                  # Backend server and APIs
├── cli/                      # CLI tools for AenzbiStudio
├── scripts/                  # Automation scripts
└── README.md                 # Project documentation
```

---

## **Setup Instructions**

### **1. Codespaces Configuration**
Create a `.devcontainer/devcontainer.json` file:

```json
{
  "name": "AenzbiStudio",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/node:1": { "version": "20" },
    "ghcr.io/devcontainers/features/docker-outside-docker:1": {}
  },
  "postCreateCommand": "bash scripts/setup.sh",
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-vscode.vscode-node-azure-pack",
        "ms-azuretools.vscode-docker",
        "dbaeumer.vscode-eslint"
      ]
    }
  }
}
```

### **2. Run the Setup Script**
Use the provided Bash script for setup and deployment. Save it as `scripts/setup.sh`:

```bash
bash scripts/setup.sh
```

---

## **Usage**

### **1. Build and Run Flutter Projects**
- Run the Flutter app for Android/iOS:
  ```bash
  flutter run
  ```
- Build release versions:
  ```bash
  flutter build apk --release
  flutter build ios --release
  ```

### **2. Start the Backend Server**
- Navigate to the backend directory and start the server:
  ```bash
  cd backend
  node server.js
  ```

### **3. Deploy to Firebase**
- Deploy Firebase Hosting and Cloud Functions:
  ```bash
  firebase deploy
  ```

### **4. Deploy to Google Cloud**
- Deploy the app and functions to Google Cloud:
  ```bash
  gcloud app deploy
  gcloud functions deploy aenzbistudio \
    --region=africa-south1 \
    --runtime=nodejs20 \
    --trigger-http
  ```

---

## **Fiscal Printer Integration**
AenzbiStudio supports fiscal printers (ESC/POS). Use the following code in the backend:

```javascript
const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const device = new escpos.USB();

const printReceipt = (data) => {
  const printer = new escpos.Printer(device);
  device.open(() => {
    printer
      .text(data)
      .cut()
      .close();
  });
};

module.exports = printReceipt;
```

---

## **Real-Time Collaboration**
AenzbiStudio enables real-time code editing with WebSocket support. The backend includes the following configuration:

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('code-edit', (data) => {
    socket.broadcast.emit('code-edit', data);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## **Deployment**

### **Firebase**
Update the `firebase.json` file to deploy to the African region:
```json
{
  "hosting": {
    "region": "africa-south1"
  }
}
```
Deploy:
```bash
firebase deploy
```

### **Google Cloud**
Deploy Google Cloud Functions to `africa-south1`:
```bash
gcloud functions deploy aenzbistudio \
  --region=africa-south1 \
  --runtime=nodejs20 \
  --trigger-http
```

---

## **Contributing**
We welcome contributions to AenzbiStudio. Please fork the repository, create a feature branch, and submit a pull request.

---

## **License**
This project is licensed under the MIT License. See `LICENSE` for details.
```