import React, { useState, useEffect } from 'react';
import useCallStore from '../store/callStore';
import useAuthStore from '../store/authStore';
import AddCallForm from '../components/AddCallForm';
import CallCard from '../components/CallCard';

const Dashboard = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState('ALL');
  
  const { calls, fetchCalls } = useCallStore();
  const { user, fetchUsers } = useAuthStore();

  useEffect(() => {
    fetchCalls();
    fetchUsers();
  }, []);

  const filteredCalls = calls.filter(call => {
    if (filter === 'ALL') return true;
    if (filter === 'MY_CALLS') return call.createdBy === user?.username;
    if (filter === 'ASSIGNED_TO_ME') return call.assignedTo === user?.username;
    if (filter === 'PENDING') return call.status === 'PENDING';
    if (filter === 'COMPLETED') return call.status === 'COMPLETED';
    return true;
  });

  const todaysCalls = calls.filter(call => {
    const today = new Date().toDateString();
    return new Date(call.createdAt).toDateString() === today;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-3xl font-bold text-blue-700">Welcome Back! {user?.username}</h3>
      
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
        >
          + Add New Call
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Calls</h3>
          <p className="text-3xl font-bold text-blue-600">{calls.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Today's Calls</h3>
          <p className="text-3xl font-bold text-green-600">{todaysCalls.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {calls.filter(c => c.status === 'PENDING').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {calls.filter(c => c.status === 'COMPLETED').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {['ALL', 'MY_CALLS', 'ASSIGNED_TO_ME', 'PENDING', 'COMPLETED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Calls List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCalls.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No calls found</p>
          </div>
        ) : (
          filteredCalls.map(call => (
            <CallCard key={call.id} call={call} />
          ))
        )}
      </div>

      {showAddForm && <AddCallForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default Dashboard;