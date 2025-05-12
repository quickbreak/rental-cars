import { Link } from 'react-router-dom';

const categories = [
  {
    type: 'sedan',
    name: 'Sedans',
    description: 'Comfortable and fuel-efficient for everyday driving.',
    image: 'https://avatars.mds.yandex.net/get-autoru-vos/11386586/be69846c5dff350778bebd38b905b5ea/1200x900n'
  },
  {
    type: 'suv',
    name: 'SUVs',
    description: 'Spacious vehicles perfect for families and adventures.',
    image: 'https://avatars.mds.yandex.net/get-autoru-vos/2068358/529dd67b99db01fdc9039ad47687d502/1200x900n'
  },
  {
    type: 'luxury',
    name: 'Luxury',
    description: 'Premium vehicles with top-tier features and comfort.',
    image: 'https://avatars.mds.yandex.net/get-autoru-vos/2071463/77f4241da5f0880c28b20a2009b15c31/1200x900n'
  },
  {
    type: 'sport',
    name: 'Sports Cars',
    description: 'High-performance vehicles for an exciting driving experience.',
    image: 'https://avatars.mds.yandex.net/get-autoru-vos/5468820/e49d7cddce59632e8b6364b19002c00e/1200x900n'
  }
];

const CarCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Our Car Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of vehicles to suit your every need, from economical compacts to luxurious SUVs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.type} 
              to={`/cars?type=${category.type}`}
              className="group overflow-hidden rounded-lg shadow-md transition-transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarCategories;