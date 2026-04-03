export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-2">NetExpressJob</h3>
          <p className="text-gray-400">A comprehensive online platform offering resources and courses.</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Legal Info</h3>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <p className="text-gray-400">Dhaka, Bangladesh</p>
          <p className="text-gray-400">Phone: +8801707349407</p>
          <p className="text-gray-400">Email: bdlearningearningitplatform@gmail.com</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-800 pt-4">
        &copy; 2025 NetExpressJob. All rights reserved.
      </div>
    </footer>
  );
}
