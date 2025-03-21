import React from 'react';
import { Box, Heading, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

function Banner({ title }) {
  return (
    <Box
      bg="blue.500"
      color="white"
      py={10}
      px={5}
      textAlign="center"
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading as="h1" size="xl" mb={4}>
        {title}
      </Heading>
      <Breadcrumb separator=">" color="whiteAlpha.800" justifyContent="center">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Text>{title}</Text>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
}

export default Banner;