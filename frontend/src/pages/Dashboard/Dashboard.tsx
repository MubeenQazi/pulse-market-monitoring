import React from 'react';
import { useDashboard } from '@hooks';
import { LoadingSpinner, ErrorMessage, PageHeader } from '@components/common';
import { PortfolioSummary, TopPerformers, RecentAlerts, RecentNews } from './components';

const Dashboard: React.FC = () => {
  const { data: dashboardData, loading, error } = useDashboard();

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!dashboardData) return <ErrorMessage message="No dashboard data available" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's your market overview"
      />

      {/* Portfolio Summary Card - Full Width Hero Section */}
      {dashboardData.portfolio && (
        <div className="relative">
          <PortfolioSummary portfolio={dashboardData.portfolio} />
        </div>
      )}

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 font-medium">Total Assets</p>
              <p className="text-2xl font-bold mt-1">{dashboardData.portfolio?.assets.length || 0}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 font-medium">Active Alerts</p>
              <p className="text-2xl font-bold mt-1">{dashboardData.recentAlerts?.length || 0}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 font-medium">Top Gainers</p>
              <p className="text-2xl font-bold mt-1">
                {dashboardData.topPerformers?.filter((p) => p.changePercent > 0).length || 0}
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 font-medium">Latest News</p>
              <p className="text-2xl font-bold mt-1">{dashboardData.recentNews?.length || 0}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Top Gainers & Losers Section */}
      {dashboardData.topPerformers && dashboardData.topPerformers.length > 0 && (
        <TopPerformers
          topGainers={dashboardData.topPerformers.filter((p) => p.changePercent > 0)}
          topLosers={dashboardData.topPerformers.filter((p) => p.changePercent < 0)}
        />
      )}

      {/* Recent News & Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dashboardData.recentNews && dashboardData.recentNews.length > 0 && (
          <RecentNews news={dashboardData.recentNews} />
        )}
        {(dashboardData.recentAlerts || (dashboardData as any).activeAlerts) && (
          <RecentAlerts alerts={(dashboardData.recentAlerts || (dashboardData as any).activeAlerts)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
