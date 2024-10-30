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

const LandingPage = ({ onGetStarted }) => {
  return (
    <Box as='section' bg='gray.100' py={20} textAlign='center' px={10}>
      <Heading fontSize={{ base: "3xl", md: "5xl" }} color='green.600'>
        Discover & Organize Your Favorite Recipes
      </Heading>
      <Text fontSize={{ base: "md", md: "xl" }} mt={4} color='gray.600'>
        Effortlessly search, organize, and share recipes with a few clicks.
      </Text>
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
          Why Choose Our Recipe Manager?
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }} color='gray.600'>
          Our platform offers a variety of features designed to enhance your
          cooking experience:
        </Text>

        {/* Full-width Image Grid for Features */}
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={0} // remove gaps to span the full width
          mt={4}
          width='100%' // Make grid take full width
        >
          {[
            {
              src: "https://via.placeholder.com/1920x1080",
              title: "Search & Filter",
              description:
                "Quickly find recipes by ingredients, cuisine, or dietary preferences.",
            },
            {
              src: "https://via.placeholder.com/1920x1080",
              title: "Organize Your Collection",
              description:
                "Save your favorite recipes into personalized folders for easy access.",
            },
            {
              src: "https://via.placeholder.com/1920x1080",
              title: "Share with Friends",
              description:
                "Easily share your recipes and meal plans with family and friends.",
            },
            {
              src: "https://via.placeholder.com/1920x1080",
              title: "Meal Planning",
              description:
                "Create and manage your weekly meal plans to simplify grocery shopping.",
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
                filter='brightness(0.7)' // Darkens the image slightly for better text readability
              />
              <Box
                position='absolute'
                top='50%'
                left='50%'
                transform='translate(-50%, -50%)'
                color='white'
                textAlign='center'
                bg='rgba(0, 0, 0, 0.6)' // Semi-transparent background for text
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
