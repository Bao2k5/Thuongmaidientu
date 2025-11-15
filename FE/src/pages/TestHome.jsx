const TestHome = () => {
  return (
    <div className="min-h-screen bg-luxury-white p-8">
      <h1 className="text-4xl font-bold text-luxury-charcoal mb-4">TEST HOME PAGE</h1>
      <p className="text-luxury-brown mb-4">Nếu bạn thấy text này, React đang hoạt động!</p>

      <div className="bg-luxury-ivory p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-luxury-charcoal mb-4">✅ Checklist:</h2>
        <ul className="space-y-2 text-luxury-brown">
          <li>✓ Vite server running</li>
          <li>✓ React rendering</li>
          <li>✓ Tailwind CSS working</li>
          <li>✓ Browser can access localhost:5173</li>
        </ul>
      </div>

      <div className="mt-8 bg-green-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-green-900 mb-2">🎉 Success!</h3>
        <p className="text-green-700">Nếu thấy trang này, tất cả đã hoạt động. Vấn đề chỉ ở HomeSimple.jsx</p>
      </div>
    </div>
  );
};

export default TestHome;
