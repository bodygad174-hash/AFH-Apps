# 🎭 Joke Generator - مولد النكات

تطبيق ويب حديث لعرض نكات عشوائية باستخدام API خارجي.

## 🚀 المميزات

- ✅ نكات عشوائية من API خارجي
- ✅ تصنيفات مختلفة (عامة، Knock Knock، برمجية)
- ✅ واجهة استخدام جميلة وسهلة
- ✅ تحميل سلس مع رسائل انتظار
- ✅ تصميم Responsive يعمل على جميع الأجهزة

## 📋 المتطلبات

```bash
npm install axios react-router-dom
```

## 🔑 API Setup

1. اذهب إلى [api-ninjas.com](https://api-ninjas.com)
2. سجل حساب جديد
3. احصل على API Key
4. استبدل `YOUR_API_KEY_HERE` في الملف `JokeGenerator.js`

```javascript
headers: {
  'X-Api-Key': 'YOUR_API_KEY_HERE' // ضع API Key هنا
}
```

## 📁 الملفات المضافة

- `frontend/src/pages/JokeGenerator.js` - صفحة مولد النكات
- `frontend/src/pages/JokeGenerator.css` - تنسيق الصفحة
- `frontend/src/App.js` - تحديث Router
- `frontend/src/components/Navbar.js` - إضافة رابط النكات

## 🎯 الاستخدام

```bash
cd frontend
npm install
npm start
```

ثم اذهب إلى: `http://localhost:3000/jokes`

## 🎨 التصميم

- تصميم gradient جميل
- رسوم متحركة سلسة
- ألوان حديثة وجذابة
- واجهة استخدام سهلة وواضحة

## 📞 API المستخدمة

- **API Ninjas** - للحصول على نكات عشوائية
- رابط API: `https://api.api-ninjas.com/v1/jokes`

## 🛠️ التطوير المستقبلي

- إضافة حفظ النكات المفضلة
- نسخ النكتة إلى Clipboard
- مشاركة النكات على وسائل التواصل
- نكات بلغات مختلفة

---

**استمتع بالنكات!** 😂