export default function Auth() {
    return (
      <div className="p-4 max-w-sm mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login / Signup</h1>
        {/* Add login/signup form here */}
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="p-2 border rounded" />
          <input type="password" placeholder="Password" className="p-2 border rounded" />
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Login</button>
        </form>
      </div>
    );
  }
  