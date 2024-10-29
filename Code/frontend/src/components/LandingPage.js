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
      <VStack mt={12} spacing={8} align='start'>
        <Heading size='lg' color='green.500'>
          Why Choose Our Recipe Manager?
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }} color='gray.600'>
          Our platform offers a variety of features designed to enhance your
          cooking experience:
        </Text>

        {/* Grid Layout for Features */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={8}
          mt={4}
        >
          <GridItem>
            <Image
              src='https://via.placeholder.com/150'
              alt='Search & Filter'
              borderRadius='md'
            />
            <Text fontSize={{ base: "sm", md: "md" }} color='gray.700' mt={2}>
              <strong>Search & Filter:</strong> Quickly find recipes by
              ingredients, cuisine, or dietary preferences.
            </Text>
          </GridItem>
          <GridItem>
            <Image
              src='https://via.placeholder.com/150'
              alt='Organize Collection'
              borderRadius='md'
            />
            <Text fontSize={{ base: "sm", md: "md" }} color='gray.700' mt={2}>
              <strong>Organize Your Collection:</strong> Save your favorite
              recipes into personalized folders for easy access.
            </Text>
          </GridItem>
          <GridItem>
            <Image
              src='https://via.placeholder.com/150'
              alt='Share with Friends'
              borderRadius='md'
            />
            <Text fontSize={{ base: "sm", md: "md" }} color='gray.700' mt={2}>
              <strong>Share with Friends:</strong> Easily share your recipes and
              meal plans with family and friends.
            </Text>
          </GridItem>
          <GridItem>
            <Image
              src='https://via.placeholder.com/150'
              alt='Meal Planning'
              borderRadius='md'
            />
            <Text fontSize={{ base: "sm", md: "md" }} color='gray.700' mt={2}>
              <strong>Meal Planning:</strong> Create and manage your weekly meal
              plans to simplify grocery shopping.
            </Text>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default LandingPage;
