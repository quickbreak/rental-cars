import { Car, Calendar, Map, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Choose Your Car',
    description: 'Browse our extensive fleet and select the perfect vehicle for your needs.',
    icon: <Car size={30} className="text-blue-700" />,
    color: 'bg-blue-100'
  },
  {
    id: 2,
    title: 'Select Dates',
    description: 'Pick your preferred rental dates and duration for your journey.',
    icon: <Calendar size={30} className="text-green-700" />,
    color: 'bg-green-100'
  },
  {
    id: 3,
    title: 'Choose Location',
    description: 'Select convenient pickup and drop-off locations from our network.',
    icon: <Map size={30} className="text-purple-700" />,
    color: 'bg-purple-100'
  },
  {
    id: 4,
    title: 'Enjoy Your Ride',
    description: 'Hit the road with confidence, backed by our support and maintenance.',
    icon: <CheckCircle size={30} className="text-orange-700" />,
    color: 'bg-orange-100'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Renting a car with us is quick and easy. Follow these simple steps to get on the road in no time.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connect steps with lines (except the last one) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 z-0"></div>
              )}
              
              <div className="bg-white rounded-lg shadow-md p-6 relative z-10 h-full flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                {/* Step number */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-blue-700 border-2 border-blue-700">
                  {step.id}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4 mt-4`}>
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;