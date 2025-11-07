# ✈️ Dream Destinations Planner

A beautiful, feature-rich React application for planning and organizing your travel bucket list with AI-powered travel insights.

## 🌟 Features

### Core Functionality
- ✅ **CRUD Operations** - Add, edit, view, and delete dream destinations
- 💾 **Local Persistence** - All data saved in browser localStorage
- ⭐ **Star Ratings** - Rate destinations from 1-5 stars
- 🖼️ **Image Upload** - Attach images with base64 encoding for persistence
- 📝 **Rich Notes** - Add detailed notes about each destination

### AI-Powered Features
- 🤖 **AI Travel Tips** - Generate travel insights using OpenAI GPT
  - Must-see places and attractions
  - Cultural etiquette tips
  - Packing suggestions
  - Unique experiences
- 🧠 **Smart Fallback** - Works with or without API key (uses mock data)

### Organization & Discovery
- 🔍 **Search** - Find destinations by name, notes, or category
- 🗂️ **Category Filter** - Filter by continent (Africa, Asia, Europe, etc.)
- 🔄 **Multiple Sort Options** - Sort by name, rating, or date added
- 📊 **Results Counter** - See how many destinations match your filters

### User Experience
- 📱 **Fully Responsive** - Works beautifully on mobile, tablet, and desktop
- 🎨 **Modern UI** - Beautiful gradient backgrounds and smooth animations
- ♿ **Accessible** - Keyboard navigation, ARIA labels, focus states
- 🎯 **Intuitive Interface** - Clean, user-friendly design

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm/yarn installed
- **OpenAI API Key** (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohammad243ahmadi/travel.git
   cd dream-destinations
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (optional)**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
   
   > **Note:** The app works without an API key - it will use mock data for AI tips.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddDestinationForm.jsx    # Form for adding/editing destinations
│   ├── DestinationCard.jsx       # Individual destination card with modal
│   ├── DestinationGrid.jsx       # Responsive grid layout
│   ├── RatingStars.jsx           # Star rating component
│   └── FiltersBar.jsx            # Search, filter, and sort controls
├── pages/              # Page components
│   └── Home.jsx                  # Main application page
├── hooks/              # Custom React hooks
│   └── useDestinations.js        # Destinations state management
├── utils/              # Utility functions
│   ├── localStorage.js           # LocalStorage helpers
│   └── openaiClient.js           # OpenAI API integration
├── App.jsx             # Root component
├── App.css             # Main styles
├── index.css           # Global styles
└── main.jsx            # Application entry point
```

## 🎯 How to Use

### Adding a Destination

1. Click the **"➕ Add New Destination"** button
2. Fill in the form:
   - **Name** (required) - e.g., "Paris", "Tokyo", "Bali"
   - **Category** - Select continent
   - **Notes** - Add personal notes
   - **Rating** - Click stars to rate (1-5)
   - **Image** (optional) - Upload a photo (max 2MB)
3. Optionally click **"✨ Get AI Tips"** for AI-generated insights
4. Click **"Add Destination"** to save

### Managing Destinations

- **View Details**: Click **"👁️ View More"** to see full information in a modal
- **Edit**: Click **"✏️ Edit"** to modify a destination
- **Delete**: Click **"🗑️ Delete"** and confirm

### Filtering & Searching

- Use the **search bar** to find destinations by name
- Select a **category** to filter by continent
- Choose **sort option** to organize your list

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server

```

## 🎨 Customization

### Color Scheme
Colors are defined in `src/index.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f5576c;
  --success-color: #4caf50;
}
```

### Categories
Edit categories in `src/components/AddDestinationForm.jsx` and `src/components/FiltersBar.jsx`.

## 🔒 Security Notes

### OpenAI API Key
- **Development**: The app uses client-side API calls (safe for personal use)
- **Production**: Consider using a serverless function to proxy OpenAI requests
  - Deploy serverless function to Vercel/Netlify
  - Store API key as environment variable on the server
  - Update `openaiClient.js` to call your serverless endpoint

### Data Storage
- All data stored in browser's localStorage
- Approximately 5-10 MB storage limit
- Images are base64 encoded (keep sizes reasonable)

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variable: `VITE_OPENAI_API_KEY`
4. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variable in Netlify dashboard

### Manual Build

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```


## 🚀 Future Enhancements

- [ ] Map integration (Leaflet/Google Maps)
- [ ] Export wishlist to PDF
- [ ] Social sharing of destinations
- [ ] Dark mode toggle
- [ ] Backend sync (Firebase/Supabase)
- [ ] Multiple trip lists
- [ ] Budget tracking
