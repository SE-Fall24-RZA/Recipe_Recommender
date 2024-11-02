import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  VStack,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Chatbot from './chatbot';

const LandingPage = ({ onGetStarted }) => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const handleChatbotToggle = () => {
    setChatbotVisible(!isChatbotVisible);
  };
  return (
    <Box as='section' bg='gray.100' py={20} textAlign='center' px={10}>
      <Heading fontSize={{ base: "3xl", md: "5xl" }} color='green.600'>
        Discover & Organize Your Favorite Recipes
      </Heading>
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={4}
        mt={8}
        justifyContent='center'
      >
        <Button size='lg' colorScheme='green' onClick={onGetStarted}>
          Get Started
        </Button>
      </Stack>

      {/* Additional Details Section */}
      <VStack mt={12} spacing={8} align='center'>
        <Heading size='lg' color='green.500'>
          Why Choose Saveurs Sélection?
        </Heading>

        {/* Full-width Image Grid for Features */}
        <Grid
          templateColumns='1fr' // Make it a single column for all screen sizes
          gap={4} // Add some gap between items
          mt={4}
          width='100%'
        >
          {[
            {
              src: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*wsWIB7I_n0XYMGca",
              title: "Search & Filter",
              description:
                "Quickly find recipes by ingredients, cuisine, or dietary preferences.",
            },
            {
              src: "https://www.labellerr.com/blog/content/images/2024/03/image--6-.webp",
              title: "Organize Your Collection",
              description:
                "Save your favorite recipes into personalized folders for easy access.",
            },
            {
              src: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600",
              title: "Meal Planning",
              description:
                "Create and manage your weekly meal plans to simplify grocery shopping.",
            },
            {
              src: "https://botsify.com/blog/wp-content/uploads/2020/05/Copy-of-Copy-of-Chatbot-Automation_-The-Use-Case-In-Major-Functions-Of-Your-Business-16.jpg",
              title: "Chatbot Assistance",
              description:
                "Ask your cooking questions or get inspiration from our Recipe Bot.",
            },
          ].map((feature, index) => (
            <GridItem
              key={index}
              position='relative'
              height='400px'
              overflow='hidden'
            >
              <Image
                src={feature.src}
                alt={feature.title}
                objectFit='cover'
                width='100%'
                height='100%'
                filter='brightness(0.7)'
              />
              <Box
                position='absolute'
                top='50%'
                left='50%'
                transform='translate(-50%, -50%)'
                color='white'
                textAlign='center'
                bg='rgba(0, 0, 0, 0.6)'
                p={4}
                borderRadius='md'
              >
                <Text fontSize='xl' fontWeight='bold'>
                  {feature.title}
                </Text>
                <Text fontSize='md'>{feature.description}</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      
      </VStack>
    </Box>
  );
};

export default LandingPage;
