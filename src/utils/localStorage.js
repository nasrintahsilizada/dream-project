export const DEST_KEY = 'dream_destinations_v1';

// Initial sample destinations
const INITIAL_DESTINATIONS = [
  {
    id: 'initial-1',
    name: 'Paris',
    location: 'France',
    category: 'City',
    rating: 5,
    notes: 'The City of Light! Experience the Eiffel Tower, world-class museums, charming cafes, and incredible French cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    createdAt: Date.now() - 86400000 * 2,
    priceRange: '$$$',
    tags: ['Culture', 'Romance', 'Art', 'Food']
  },
  {
    id: 'initial-2',
    name: 'Bali',
    location: 'Indonesia',
    category: 'Beach',
    rating: 5,
    notes: 'Tropical paradise with stunning beaches, ancient temples, lush rice terraces, and vibrant culture.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    createdAt: Date.now() - 86400000,
    priceRange: '$$',
    tags: ['Beach', 'Culture', 'Adventure', 'Wellness']
  },
  {
    id: 'initial-3',
    name: 'Swiss Alps',
    location: 'Switzerland',
    category: 'Mountain',
    rating: 5,
    notes: 'Breathtaking mountain scenery, world-class skiing, charming villages, and pristine alpine lakes.',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    createdAt: Date.now(),
    priceRange: '$$$$',
    tags: ['Nature', 'Adventure', 'Skiing', 'Hiking']
  }
];
export const getDestinations = () => {
  try {
    const raw = localStorage.getItem(DEST_KEY);
    if (!raw) {
      saveDestinations(INITIAL_DESTINATIONS);
      return INITIAL_DESTINATIONS;
    }
    const destinations = JSON.parse(raw);
    if (destinations.length === 0) {
      saveDestinations(INITIAL_DESTINATIONS);
      return INITIAL_DESTINATIONS;
    }
    return destinations;
  } catch (e) {
    console.error('Failed to parse destinations', e);
    saveDestinations(INITIAL_DESTINATIONS);
    return INITIAL_DESTINATIONS;
  }
};

export const saveDestinations = (list) => {
  try {
    localStorage.setItem(DEST_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save destinations', e);
    if (e.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please remove some images or destinations.');
    }
  }
};



export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
};

export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
