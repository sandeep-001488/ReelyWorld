import React from 'react'

const LeftSidePanel = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white p-8 hidden lg:flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Discover</h2>
        <p className="text-xl opacity-90">Amazing content</p>
      </div>
    </div>
  );
}

export default LeftSidePanel