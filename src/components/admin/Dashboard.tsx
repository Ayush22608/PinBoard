import React, { useEffect, useState } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Image,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalPosters: number;
  revenueChange: number;
  ordersChange: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalPosters: 0,
    revenueChange: 0,
    ordersChange: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total posters
        const postersSnapshot = await getDocs(collection(db, 'posters'));
        const totalPosters = postersSnapshot.size;

        // Get total users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const totalUsers = usersSnapshot.size;

        // Get orders and calculate revenue
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        let totalRevenue = 0;
        let totalOrders = 0;

        // Calculate current month's stats
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        let currentMonthRevenue = 0;
        let currentMonthOrders = 0;
        let lastMonthRevenue = 0;
        let lastMonthOrders = 0;

        ordersSnapshot.forEach((doc) => {
          const order = doc.data();
          totalRevenue += order.total;
          totalOrders++;

          const orderDate = order.createdAt.toDate();
          
          if (orderDate >= startOfMonth) {
            currentMonthRevenue += order.total;
            currentMonthOrders++;
          } else if (orderDate >= startOfLastMonth && orderDate < startOfMonth) {
            lastMonthRevenue += order.total;
            lastMonthOrders++;
          }
        });

        // Calculate percentage changes
        const revenueChange = lastMonthRevenue === 0 
          ? 100 
          : ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
        
        const ordersChange = lastMonthOrders === 0 
          ? 100 
          : ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100;

        setStats({
          totalRevenue,
          totalOrders,
          totalUsers,
          totalPosters,
          revenueChange,
          ordersChange,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: number;
  }> = ({ title, value, icon, change }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="text-2xl font-semibold text-neutral-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {change >= 0 ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span className={`text-sm ml-1 ${
                change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {Math.abs(change).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-secondary-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon={<DollarSign size={24} className="text-secondary-600" />}
          change={stats.revenueChange}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart size={24} className="text-secondary-600" />}
          change={stats.ordersChange}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users size={24} className="text-secondary-600" />}
        />
        <StatCard
          title="Total Posters"
          value={stats.totalPosters}
          icon={<Image size={24} className="text-secondary-600" />}
        />
      </div>

      {/* Add more dashboard sections here */}
    </div>
  );
};

export default Dashboard; 