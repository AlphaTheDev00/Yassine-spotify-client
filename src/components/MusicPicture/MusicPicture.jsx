import { useState, useEffect, useCallback } from 'react';
import { getRandomMusicImage } from '../../services/smartPictureService';
import { Box, Image, Spinner } from '@chakra-ui/react';

/**
 * MusicPicture Component
 * 
 * Displays a random music-themed image that can be refreshed.
 * Useful for decorative elements, placeholders, or anywhere
 * you want to add visual interest with music-related imagery.
 */
const MusicPicture = ({ 
  width = 300, 
  height = 300, 
  refreshable = false,
  rounded = "md",
  shadow = "md",
  className = "",
  alt = "Music-themed image"
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  // Load a random music image
  const loadRandomImage = useCallback(() => {
    setLoading(true);
    const newImageUrl = getRandomMusicImage(width, height);
    setImageUrl(newImageUrl);
    setLoading(false);
  }, [width, height]);

  // Load an image when the component mounts
  useEffect(() => {
    loadRandomImage();
  }, [loadRandomImage]);

  return (
    <Box 
      position="relative" 
      width={`${width}px`} 
      height={`${height}px`}
      className={className}
    >
      {loading ? (
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          width="100%" 
          height="100%"
          bg="gray.100"
          borderRadius={rounded}
        >
          <Spinner size="xl" color="gray.500" />
        </Box>
      ) : (
        <>
          <Image
            src={imageUrl}
            alt={alt}
            width="100%"
            height="100%"
            objectFit="cover"
            borderRadius={rounded}
            boxShadow={shadow}
          />
          
          {refreshable && (
            <Box
              position="absolute"
              bottom="8px"
              right="8px"
              bg="blackAlpha.700"
              color="white"
              borderRadius="full"
              width="32px"
              height="32px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onClick={loadRandomImage}
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.1)' }}
              title="Load a different image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 4v6h-6"></path>
                <path d="M1 20v-6h6"></path>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
              </svg>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default MusicPicture;
