import Link from 'next/link';
import { RestaurantLogo } from '@/components/animations/RestaurantLogo';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <RestaurantLogo />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-4">
          Savory Delights
        </h1>
        
        <p className="text-xl md:text-2xl text-amber-800 mb-6">
          Restaurant Slogan
        </p>
        
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-lg text-amber-700 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus minima quisquam officiis fugiat iste! Dicta quod dignissimos, quo sunt saepe quis magni fuga vitae provident voluptatem obcaecati dolorum consequuntur officia.
          </p>
          
          <p className="text-lg text-amber-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium delectus architecto, placeat quisquam a cumque nesciunt totam nulla fugit voluptate animi voluptas dicta nam modi, sapiente nostrum consequatur vel quo.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">Our Location</h3>
            <p className="text-amber-700">123 Culinary Avenue, Foodie District</p>
            <p className="text-amber-700">Open: Mon-Sun, 11am - 10pm</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">Reservations</h3>
            <p className="text-amber-700">Call: (555) 123-4567</p>
            <p className="text-amber-700">Email: reservations@savorydelights.com</p>
          </div>
        </div>
        
        <Link 
          href="/menu" 
          className="inline-block px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
        >
          Explore Our Menu
        </Link>
      </div>
    </main>
  );
}
