import { useState } from 'react';
import { Box, Button, SimpleGrid, Text, VStack, HStack, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import MusicPicture from './MusicPicture';

/**
 * MusicPictureShowcase Component
 * 
 * A showcase component that demonstrates the MusicPicture component's capabilities.
 * Allows users to view multiple random music pictures and customize their appearance.
 */
const MusicPictureShowcase = () => {
  const [count, setCount] = useState(6);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [rounded, setRounded] = useState("md");
  const [shadow, setShadow] = useState("md");
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Refresh all images
  const refreshAll = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };
  
  return (
    <Box p={6} maxWidth="1200px" mx="auto">
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">Music Picture Gallery</Text>
        
        <Box bg="gray.50" p={4} borderRadius="md">
          <Text fontSize="lg" mb={4}>Customize Gallery</Text>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <HStack>
              <Text minWidth="80px">Count:</Text>
              <NumberInput 
                value={count} 
                onChange={(_, val) => setCount(val)} 
                min={1} 
                max={12}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
            
            <HStack>
              <Text minWidth="80px">Width:</Text>
              <NumberInput 
                value={width} 
                onChange={(_, val) => setWidth(val)} 
                min={100} 
                max={600}
                step={50}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
            
            <HStack>
              <Text minWidth="80px">Height:</Text>
              <NumberInput 
                value={height} 
                onChange={(_, val) => setHeight(val)} 
                min={100} 
                max={600}
                step={50}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
            
            <HStack>
              <Text minWidth="80px">Rounded:</Text>
              <Select value={rounded} onChange={(e) => setRounded(e.target.value)}>
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="full">Full (Circle)</option>
              </Select>
            </HStack>
            
            <HStack>
              <Text minWidth="80px">Shadow:</Text>
              <Select value={shadow} onChange={(e) => setShadow(e.target.value)}>
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="2xl">2XL</option>
              </Select>
            </HStack>
            
            <HStack>
              <Button colorScheme="blue" onClick={refreshAll} width="full">
                Refresh All Images
              </Button>
            </HStack>
          </SimpleGrid>
        </Box>
        
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {Array.from({ length: count }).map((_, index) => (
            <MusicPicture
              key={`${index}-${refreshKey}`}
              width={width}
              height={height}
              refreshable={true}
              rounded={rounded}
              shadow={shadow}
              alt={`Random music image ${index + 1}`}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default MusicPictureShowcase;
