import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface CarGalleryProps {
  images: string[];
  carName: string;
}

const CarGallery = ({ images, carName }: CarGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goToPrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const openLightbox = () => {
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="mb-8">
      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-2">
        <img 
          src={images[currentImageIndex]} 
          alt={`${carName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        <button 
          onClick={goToPrevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          onClick={goToNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
        
        <button 
          onClick={openLightbox}
          className="absolute right-2 top-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition"
          aria-label="View full size"
        >
          <Maximize2 size={20} />
        </button>
      </div>
      
      <div className="flex overflow-x-auto space-x-2 py-2">
        {images.map((image, index) => (
          <button 
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`min-w-20 h-16 border-2 rounded-md overflow-hidden focus:outline-none ${
              index === currentImageIndex ? 'border-blue-700' : 'border-transparent'
            }`}
          >
            <img 
              src={image} 
              alt={`${carName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-screen p-4">
            <button 
              onClick={e => {
                e.stopPropagation();
                goToPrevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <img 
              src={images[currentImageIndex]} 
              alt={`${carName} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
              onClick={e => e.stopPropagation()}
            />
            
            <button 
              onClick={e => {
                e.stopPropagation();
                goToNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-xl font-semibold bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarGallery;