# Smart City Data Dashboard - Setup & Deployment Guide

## 🎯 Current Status

### ✅ What's Working
- **Frontend**: Fully responsive React + TypeScript dashboard
- **Backend**: Supabase Edge Functions (Deno/Hono server)
- **AI Integration**: OpenAI GPT-3.5 powered assistant
- **Data Sources**: OpenWeatherMap & IQAir APIs
- **Features**: Real-time weather, air quality, trends, search, chat

### ⚙️ Real-Time Data Setup

**You have 3 API keys ready to use:**
1. **OpenWeatherMap**: `00e8bb67c9ef2e94c9ba9cbc1f4975d0`
2. **IQAir**: `15bf872e-4288-4bd6-9372-b2289e036aef`
3. **OpenAI**: `sk-...fUcA` (your key)

---

## 📝 Step-by-Step: Enable Real-Time Data

### **In Your Current Supabase Environment:**

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project: `vaigkqzljzcmnvgyinfu`

2. **Add API Keys as Secrets**
   - Click: **Edge Functions** → **Manage Secrets**
   - Add these 3 secrets (if not already added):

   ```
   OPENWEATHERMAP_API_KEY = 00e8bb67c9ef2e94c9ba9cbc1f4975d0
   IQAIR_API_KEY = 15bf872e-4288-4bd6-9372-b2289e036aef
   OPENAI_API_KEY = sk-...fUcA
   ```

3. **Verify Setup**
   - Refresh your dashboard
   - You should see: **"🟢 Live Data Active"** banner
   - Search for any city to test real-time data

---

## 💾 Exporting to External Storage

### **What You Can Export:**

✅ **Frontend Code** (`/App.tsx`, `/components/*`, `/styles/*`)
✅ **Backend Code** (`/supabase/functions/server/*`)
✅ **Configuration** (package dependencies, structure)

### **What Needs Modification for External Use:**

⚠️ **Supabase-Specific Code:**
- `/utils/supabase/info.tsx` - Contains your Supabase project details
- Environment variables need to be reconfigured
- Backend server uses Deno (Supabase Edge Functions runtime)

---

## 🚀 Deployment Options

### **Option 1: Keep in Supabase (Recommended)**

**Pros:**
- No changes needed
- Edge Functions already deployed
- API keys managed securely
- Serverless, auto-scaling

**Cons:**
- Locked to Supabase ecosystem

**Steps:**
- Add API keys (done above)
- Share the live URL: `https://vaigkqzljzcmnvgyinfu.supabase.co`

---

### **Option 2: Deploy Frontend Only (Vercel/Netlify)**

**Use Case:** Want to deploy just the UI elsewhere

**Required Changes:**

1. **Replace Backend URL**
   ```typescript
   // In App.tsx, change from:
   const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2d6e0233`;
   
   // To:
   const API_BASE_URL = 'https://your-new-backend-url.com';
   ```

2. **Keep Supabase Backend Running**
   - Backend stays in Supabase
   - Frontend calls it via HTTPS

3. **Deploy Frontend:**
   ```bash
   # Clone/download all files
   npm install
   npm run build
   # Deploy to Vercel/Netlify
   ```

---

### **Option 3: Full Migration (Node.js/Express)**

**Use Case:** Want complete control, no Supabase

**Required Changes:**

1. **Convert Backend to Node.js**
   - Rewrite `/supabase/functions/server/index.tsx` from Deno → Node
   - Replace `Hono` with `Express` or keep Hono (works with Node too)
   - Change imports from `npm:` to regular `import`

2. **Environment Variables**
   ```bash
   # Create .env file
   OPENWEATHERMAP_API_KEY=00e8bb67c9ef2e94c9ba9cbc1f4975d0
   IQAIR_API_KEY=15bf872e-4288-4bd6-9372-b2289e036aef
   OPENAI_API_KEY=sk-...fUcA
   ```

3. **Update Frontend Config**
   - Remove `/utils/supabase/info.tsx`
   - Hardcode or use env variables for API URL

4. **Database** (if using KV store)
   - Replace Supabase KV with Redis/MongoDB
   - Update `/supabase/functions/server/kv_store.tsx` calls

**Estimated Effort:** 4-6 hours

---

## 🛡️ Potential Issues & Solutions

### **Issue 1: "Failed to fetch weather data"**

**Causes:**
- API keys not set in Supabase Secrets
- Network/CORS issues
- Location not found

**Solution:**
```bash
1. Check browser console (F12) for detailed logs
2. Verify API keys in Supabase Dashboard
3. Test with simple cities first (Bangalore, Delhi)
```

---

### **Issue 2: "Demo Mode Active" banner shows**

**Cause:** API keys not loaded by server

**Solution:**
```bash
1. Go to Supabase Dashboard → Edge Functions → Manage Secrets
2. Add all 3 API keys
3. Redeploy Edge Functions (may auto-deploy)
4. Refresh dashboard
```

---

### **Issue 3: AI Assistant not responding**

**Causes:**
- OpenAI API key missing/invalid
- Rate limits exceeded
- Network error

**Solution:**
```bash
1. Verify OPENAI_API_KEY is set correctly
2. Check OpenAI API dashboard for quota
3. Test with simple query: "Weather in Bangalore?"
```

---

### **Issue 4: Search suggestions not appearing**

**Causes:**
- Typing too fast (debounce delay)
- Server endpoint error
- CORS issues

**Solution:**
```bash
1. Type slowly and wait 300ms
2. Check browser console for errors
3. Test endpoint: /make-server-2d6e0233/search-locations?q=bang
```

---

## 📦 File Extraction Checklist

### **Before Extracting:**

- [ ] Test all features work with real-time data
- [ ] Verify API keys are set in Supabase
- [ ] Check browser console for any errors
- [ ] Test on mobile and desktop
- [ ] Ensure AI assistant works properly

### **Files to Extract:**

```
Essential Files:
├── App.tsx                     # Main application
├── components/                 # All React components
├── styles/globals.css          # Global styles
├── supabase/functions/server/  # Backend code
└── utils/supabase/info.tsx     # Supabase config (modify for external use)

Optional:
├── SETUP_GUIDE.md             # This file
├── Attributions.md            # Credits
└── guidelines/                # Development guidelines
```

### **After Extraction:**

1. **If staying in Supabase:** No changes needed
2. **If moving to Vercel/Netlify:** Update `API_BASE_URL` in App.tsx
3. **If full migration:** Follow "Option 3" above

---

## 🔐 Security Best Practices

### **Current Setup (Supabase):**
✅ API keys stored as secrets (not in code)
✅ CORS enabled on backend
✅ Rate limiting via API providers
✅ No sensitive data in frontend

### **If Deploying Elsewhere:**
- Never commit API keys to Git
- Use `.env` files (add to `.gitignore`)
- Use environment variables in production
- Enable CORS only for your domain
- Consider adding rate limiting

---

## 🎓 Credits

**Created by:** Likith Gowda  
**Contributor:** Sai Shree Pavan  
**Institution:** Atria Institute of Technology  
**Department:** Information Science & Engineering

---

## 📞 Support

### **Common Questions:**

**Q: Can I use this dashboard offline?**  
A: No, it requires internet for API calls (weather, AQI, AI).

**Q: Are there any costs?**  
A: Free tiers available for all APIs used. Monitor usage to avoid charges.

**Q: Can I add more cities?**  
A: Yes! Edit `/supabase/functions/server/index.tsx` → `allCities` array.

**Q: How often does data refresh?**  
A: Each search fetches live data. AI assistant can request updates.

**Q: Can I customize the UI?**  
A: Yes! All styles are in Tailwind classes. Edit components freely.

---

## ✅ Final Checklist

### **For Current Supabase Setup:**
- [ ] Add 3 API keys to Supabase Secrets
- [ ] Refresh dashboard
- [ ] Verify "Live Data Active" banner shows
- [ ] Test search for Bangalore, Delhi, Mysore
- [ ] Test AI assistant: "What's the weather in Hebbal?"
- [ ] Test on mobile device
- [ ] Check footer credits display correctly

### **For External Deployment:**
- [ ] Download all files from file structure
- [ ] Set up new backend (if needed)
- [ ] Configure environment variables
- [ ] Update API_BASE_URL in frontend
- [ ] Test locally before deploying
- [ ] Deploy frontend + backend
- [ ] Test production deployment
- [ ] Monitor API usage and errors

---

## 🎉 You're All Set!

Your Smart City Dashboard is production-ready with:
- ✅ Real-time weather data (OpenWeatherMap)
- ✅ Real-time air quality data (IQAir)
- ✅ AI-powered assistant (OpenAI GPT-3.5)
- ✅ Smart search with autocomplete
- ✅ Beautiful UI with dark mode
- ✅ Mobile responsive design
- ✅ Professional footer credits

**Next Steps:**
1. Add API keys to Supabase Secrets
2. Test the dashboard
3. Share with others!

Enjoy your fully functional Smart City Dashboard! 🌟
