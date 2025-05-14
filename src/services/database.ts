import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Poster, Order, UserProfile } from '../types/poster';

// Poster Operations
export const posterService = {
  // Create a new poster
  async create(posterData: Omit<Poster, 'id' | 'createdAt' | 'updatedAt'>) {
    const posterRef = await addDoc(collection(db, 'posters'), {
      ...posterData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return posterRef.id;
  },

  // Get a single poster by ID
  async getById(id: string) {
    const posterRef = doc(db, 'posters', id);
    const posterSnap = await getDoc(posterRef);
    if (posterSnap.exists()) {
      return { id: posterSnap.id, ...posterSnap.data() } as Poster;
    }
    return null;
  },

  // Get all posters with optional filters
  async getAll(filters?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) {
    console.log('posterService.getAll called with filters:', filters);
    let q = collection(db, 'posters');
    const constraints: QueryConstraint[] = [];

    if (filters?.category) {
      constraints.push(where('category', '==', filters.category));
    }

    if (filters?.featured !== undefined) {
      constraints.push(where('featured', '==', filters.featured));
    }

    if (filters?.orderBy) {
      constraints.push(orderBy(filters.orderBy, filters.orderDirection || 'desc'));
    }

    if (filters?.limit) {
      constraints.push(limit(filters.limit));
    }

    console.log('Query constraints:', constraints);
    const querySnapshot = await getDocs(query(q, ...constraints));
    console.log('Query snapshot size:', querySnapshot.size);
    const posters = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Document data:', { id: doc.id, ...data });
      return { id: doc.id, ...data } as Poster;
    });
    console.log('Returning posters:', posters);
    return posters;
  },

  // Update a poster
  async update(id: string, posterData: Partial<Poster>) {
    const posterRef = doc(db, 'posters', id);
    await updateDoc(posterRef, {
      ...posterData,
      updatedAt: serverTimestamp(),
    });
  },

  // Delete a poster
  async delete(id: string) {
    const posterRef = doc(db, 'posters', id);
    await deleteDoc(posterRef);
  },

  // Search posters
  async search(searchTerm: string) {
    const postersRef = collection(db, 'posters');
    const q = query(postersRef, where('title', '>=', searchTerm), where('title', '<=', searchTerm + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Poster));
  }
};

// Order Operations
export const orderService = {
  // Create a new order
  async create(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return orderRef.id;
  },

  // Get order by ID
  async getById(id: string) {
    const orderRef = doc(db, 'orders', id);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      return { id: orderSnap.id, ...orderSnap.data() } as Order;
    }
    return null;
  },

  // Get user's orders
  async getByUserId(userId: string) {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  },

  // Update order status
  async updateStatus(id: string, status: Order['status']) {
    const orderRef = doc(db, 'orders', id);
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  }
};

// User Profile Operations
export const userService = {
  // Create or update user profile
  async createOrUpdate(userData: Omit<UserProfile, 'createdAt' | 'updatedAt'>) {
    const userRef = doc(db, 'users', userData.uid);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  },

  // Get user profile
  async getById(uid: string) {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { uid: userSnap.id, ...userSnap.data() } as UserProfile;
    }
    return null;
  },

  // Update user profile
  async update(uid: string, userData: Partial<UserProfile>) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    });
  }
};

// Category Operations
export const categoryService = {
  // Get all categories
  async getAll() {
    const categoriesRef = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Get posters by category
  async getPostersByCategory(categoryId: string) {
    return posterService.getAll({ category: categoryId });
  }
}; 