import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';

const offers = [
  {
    id: 'offer-1',
    title: 'Weekend Getaway Special',
    description: 'Get 15% off on weekend rentals. Perfect for a quick escape!',
    code: 'WEEKEND15',
    expiryDate: '2023-12-31',
    image: 'https://avatars.mds.yandex.net/get-autoru-vos/11386586/be69846c5dff350778bebd38b905b5ea/1200x900n',
    discount: '15%'
  },
  {
    id: 'offer-2',
    title: 'Weekly Rental Discount',
    description: 'Save 25% when you rent for a week or longer.',
    code: 'WEEK25',
    expiryDate: '2023-12-31',
    image: 'https://avatars.mds.yandex.net/get-autoru-vos/4710094/3e3918b0fe9e9d49406535f4fffb7af9/1200x900n',
    discount: '25%'
  },
  {
    id: 'offer-3',
    title: 'Luxury Experience',
    description: 'Upgrade to a luxury car for the price of a premium one.',
    code: 'LUXURY',
    expiryDate: '2023-11-30',
    image: 'https://avatars.mds.yandex.net/get-autoru-vos/2071463/77f4241da5f0880c28b20a2009b15c31/1200x900n',
    discount: 'Free Upgrade'
  }
];

const SpecialOffers = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="inline-block p-2 bg-yellow-100 text-yellow-800 rounded-full mb-3">
            <Tag size={20} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take advantage of our limited-time deals and save on your next car rental.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-4 py-2 font-bold">
                  {offer.discount} OFF
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    Valid until: {new Date(offer.expiryDate).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div 
                    className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded cursor-pointer"
                    onClick={() => copyToClipboard(offer.code)}
                  >
                    <span className="font-mono font-bold">{offer.code}</span>
                    <span className="text-xs">
                      {copiedCode === offer.code ? 'Copied!' : 'Click to copy'}
                    </span>
                  </div>
                  
                  <Link 
                    to="/cars" 
                    className="text-blue-700 hover:text-blue-800 flex items-center"
                  >
                    View 
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;